from django.contrib import admin

from . import models as m


@admin.register(m.ImpactStat)
class ImpactStatAdmin(admin.ModelAdmin):
    list_display = ("value", "label", "order", "is_active")
    list_editable = ("order", "is_active")


@admin.register(m.LeadershipMember)
class LeadershipMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "position", "category", "order", "is_active")
    list_filter = ("category", "is_active")
    list_editable = ("order",)
    search_fields = ("name", "position", "bio")


@admin.register(m.Affiliate)
class AffiliateAdmin(admin.ModelAdmin):
    list_display = ("name", "region", "town", "is_active")
    list_filter = ("region", "is_active")
    search_fields = ("name", "town", "activities")


@admin.register(m.MembershipApplication)
class MembershipApplicationAdmin(admin.ModelAdmin):
    list_display = ("cooperative_name", "contact_person", "email", "status", "submitted_at")
    list_filter = ("status", "region")
    search_fields = ("cooperative_name", "contact_person", "email")
    readonly_fields = ("submitted_at",)


@admin.register(m.Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "icon", "order", "is_active")
    list_editable = ("order", "is_active")


@admin.register(m.Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "status", "start_date", "is_active")
    list_filter = ("category", "status", "is_active")
    search_fields = ("title", "summary", "description")


@admin.register(m.NewsPost)
class NewsPostAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "is_published", "published_at")
    list_filter = ("category", "is_published")
    search_fields = ("title", "summary", "body")


@admin.register(m.Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "location", "event_date", "is_upcoming")
    search_fields = ("title", "description", "location")
    date_hierarchy = "event_date"


@admin.register(m.Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "year", "is_published", "created_at")
    list_filter = ("category", "is_published")
    search_fields = ("title", "description")


@admin.register(m.Opportunity)
class OpportunityAdmin(admin.ModelAdmin):
    list_display = ("title", "kind", "closing_date", "is_active", "posted_at")
    list_filter = ("kind", "is_active")
    search_fields = ("title", "summary", "description")


@admin.register(m.OpportunityApplication)
class OpportunityApplicationAdmin(admin.ModelAdmin):
    list_display = ("full_name", "opportunity", "email", "status", "submitted_at")
    list_filter = ("status", "opportunity")
    search_fields = ("full_name", "email", "organisation")
    readonly_fields = ("submitted_at",)


@admin.register(m.ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "subject", "status", "submitted_at")
    list_filter = ("status",)
    search_fields = ("full_name", "email", "subject", "message")
    readonly_fields = ("submitted_at",)
