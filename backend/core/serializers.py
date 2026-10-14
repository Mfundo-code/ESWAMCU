from django.contrib.auth.models import User
from rest_framework import serializers

from . import models as m


def display(field):
    """Read-only human label for a choices field, e.g. category -> 'Board of Directors'."""
    return serializers.CharField(source=f"get_{field}_display", read_only=True)


class ImpactStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.ImpactStat
        fields = ["id", "value", "label", "caption", "order", "is_active"]


class LeadershipMemberSerializer(serializers.ModelSerializer):
    category_display = display("category")

    class Meta:
        model = m.LeadershipMember
        fields = [
            "id", "name", "position", "category", "category_display",
            "bio", "image", "order", "is_active",
        ]


class AffiliateSerializer(serializers.ModelSerializer):
    region_display = display("region")

    class Meta:
        model = m.Affiliate
        fields = [
            "id", "name", "region", "region_display", "town", "activities", "description",
            "contact_person", "phone", "email", "website_url", "logo", "is_active",
        ]


class MembershipApplicationSerializer(serializers.ModelSerializer):
    """Public POST (join request) and staff PATCH (status) share this serializer."""

    region_display = display("region")

    class Meta:
        model = m.MembershipApplication
        fields = [
            "id", "cooperative_name", "contact_person", "email", "phone", "region",
            "region_display", "message", "supporting_document", "status", "submitted_at",
        ]
        read_only_fields = ["submitted_at"]


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Service
        fields = ["id", "title", "summary", "description", "icon", "order", "is_active"]


class ProjectSerializer(serializers.ModelSerializer):
    category_display = display("category")
    status_display = display("status")

    class Meta:
        model = m.Project
        fields = [
            "id", "title", "category", "category_display", "summary", "description",
            "image", "status", "status_display", "start_date", "is_active",
        ]


class NewsPostSerializer(serializers.ModelSerializer):
    category_display = display("category")

    class Meta:
        model = m.NewsPost
        fields = [
            "id", "title", "category", "category_display", "summary", "body",
            "image", "file", "is_published", "published_at",
        ]


class EventSerializer(serializers.ModelSerializer):
    is_upcoming = serializers.BooleanField(read_only=True)

    class Meta:
        model = m.Event
        fields = [
            "id", "title", "description", "location", "event_date",
            "cover_photo", "is_upcoming", "created_at",
        ]


class ResourceSerializer(serializers.ModelSerializer):
    category_display = display("category")

    class Meta:
        model = m.Resource
        fields = [
            "id", "title", "category", "category_display", "description",
            "year", "file", "is_published", "created_at",
        ]


class OpportunitySerializer(serializers.ModelSerializer):
    kind_display = display("kind")

    class Meta:
        model = m.Opportunity
        fields = [
            "id", "title", "kind", "kind_display", "summary", "description", "requirements",
            "closing_date", "file", "is_active", "posted_at",
        ]


class OpportunityApplicationSerializer(serializers.ModelSerializer):
    opportunity_title = serializers.CharField(source="opportunity.title", read_only=True)

    class Meta:
        model = m.OpportunityApplication
        fields = [
            "id", "opportunity", "opportunity_title", "full_name", "organisation",
            "email", "phone", "message", "document", "status", "submitted_at",
        ]
        read_only_fields = ["submitted_at"]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.ContactMessage
        fields = ["id", "full_name", "email", "phone", "subject", "message", "status", "submitted_at"]
        read_only_fields = ["submitted_at"]


# ---- Admin accounts (the in-panel "Admins" screen) ----

class AdminUserSerializer(serializers.ModelSerializer):
    """
    `password` is write-only and optional: required when creating (enforced in
    create()), and left blank on edit to keep the current password.
    """

    password = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True,
        style={"input_type": "password"},
    )

    class Meta:
        model = User
        fields = [
            "id", "username", "email", "is_staff", "is_superuser",
            "is_active", "date_joined", "password",
        ]
        read_only_fields = ["date_joined"]

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        if not password:
            raise serializers.ValidationError(
                {"password": "A password is required when creating a new admin."}
            )
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
