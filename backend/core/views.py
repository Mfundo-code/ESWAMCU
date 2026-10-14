from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import status as http_status
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from website.permissions import IsStaffOrReadOnly, PublicCreateStaffManage

from . import models as m
from . import serializers as s


def is_staff(request):
    user = request.user
    return bool(user and user.is_authenticated and user.is_staff)


class ContentViewSet(viewsets.ModelViewSet):
    """
    Base for public site content.

    - public_filter  : applied for visitors only (e.g. {"is_active": True});
                       staff in the admin panel always see everything.
    - query_filters  : query-string params that map straight onto model fields,
                       e.g. ?category=board  or  ?status=new
    """

    permission_classes = [IsStaffOrReadOnly]
    public_filter = {}
    query_filters = ()

    def get_queryset(self):
        qs = super().get_queryset()
        if self.public_filter and not is_staff(self.request):
            qs = qs.filter(**self.public_filter)
        params = self.request.query_params
        wanted = {f: params[f] for f in self.query_filters if params.get(f)}
        return qs.filter(**wanted) if wanted else qs


class SubmissionViewSet(ContentViewSet):
    """Public can submit (POST). Only staff can read / manage what was submitted."""

    permission_classes = [PublicCreateStaffManage]
    query_filters = ("status",)

    def perform_create(self, serializer):
        # A visitor must never be able to choose their own review status.
        if not is_staff(self.request):
            default = self.queryset.model._meta.get_field("status").default
            serializer.save(status=default)
        else:
            serializer.save()


# ---- Home ----

class ImpactStatViewSet(ContentViewSet):
    queryset = m.ImpactStat.objects.all()
    serializer_class = s.ImpactStatSerializer
    public_filter = {"is_active": True}


# ---- Leadership ----

class LeadershipMemberViewSet(ContentViewSet):
    """Supports ?category=board | management | governance."""

    queryset = m.LeadershipMember.objects.all()
    serializer_class = s.LeadershipMemberSerializer
    public_filter = {"is_active": True}
    query_filters = ("category",)


# ---- Affiliates ----

class AffiliateViewSet(ContentViewSet):
    """Supports ?region=hhohho | manzini | shiselweni | lubombo."""

    queryset = m.Affiliate.objects.all()
    serializer_class = s.AffiliateSerializer
    public_filter = {"is_active": True}
    query_filters = ("region",)


class MembershipApplicationViewSet(SubmissionViewSet):
    queryset = m.MembershipApplication.objects.all()
    serializer_class = s.MembershipApplicationSerializer


# ---- What we do / Projects ----

class ServiceViewSet(ContentViewSet):
    queryset = m.Service.objects.all()
    serializer_class = s.ServiceSerializer
    public_filter = {"is_active": True}


class ProjectViewSet(ContentViewSet):
    """Supports ?category=agriculture | financing | other."""

    queryset = m.Project.objects.all()
    serializer_class = s.ProjectSerializer
    public_filter = {"is_active": True}
    query_filters = ("category", "status")


# ---- News & events ----

class NewsPostViewSet(ContentViewSet):
    """Supports ?category=news | announcement."""

    queryset = m.NewsPost.objects.all()
    serializer_class = s.NewsPostSerializer
    public_filter = {"is_published": True}
    query_filters = ("category",)


class EventViewSet(ContentViewSet):
    """Supports ?when=upcoming (soonest first) or ?when=past (latest first)."""

    queryset = m.Event.objects.all()
    serializer_class = s.EventSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        when = self.request.query_params.get("when")
        now = timezone.now()
        if when == "upcoming":
            qs = qs.filter(event_date__gte=now).order_by("event_date")
        elif when == "past":
            qs = qs.filter(event_date__lt=now).order_by("-event_date")
        return qs


# ---- Resources ----

class ResourceViewSet(ContentViewSet):
    """Supports ?category=report | form | policy | publication."""

    queryset = m.Resource.objects.all()
    serializer_class = s.ResourceSerializer
    public_filter = {"is_published": True}
    query_filters = ("category",)


# ---- Opportunities ----

class OpportunityViewSet(ContentViewSet):
    """Supports ?kind=vacancy | tender | partnership | business."""

    queryset = m.Opportunity.objects.all()
    serializer_class = s.OpportunitySerializer
    public_filter = {"is_active": True}
    query_filters = ("kind",)


class OpportunityApplicationViewSet(SubmissionViewSet):
    queryset = m.OpportunityApplication.objects.all()
    serializer_class = s.OpportunityApplicationSerializer


# ---- Contact ----

class ContactMessageViewSet(SubmissionViewSet):
    queryset = m.ContactMessage.objects.all()
    serializer_class = s.ContactMessageSerializer


# ---- Admin accounts ----

class AdminUserViewSet(viewsets.ModelViewSet):
    """
    Manage staff/admin accounts from inside the admin panel. Only staff users
    can reach this (IsAdminUser checks is_staff), and nobody can delete the
    account they are signed in with, so no one can lock themselves out.
    """

    queryset = User.objects.all().order_by("username")
    serializer_class = s.AdminUserSerializer
    permission_classes = [IsAdminUser]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.pk == request.user.pk:
            return Response(
                {"detail": "You can't delete your own account while signed in as it."},
                status=http_status.HTTP_400_BAD_REQUEST,
            )
        return super().destroy(request, *args, **kwargs)
