from rest_framework.routers import DefaultRouter

from . import views as v

router = DefaultRouter()

# Home
router.register("impact-stats", v.ImpactStatViewSet, basename="impact-stat")

# Leadership
router.register("leadership", v.LeadershipMemberViewSet, basename="leadership")

# Our Affiliates
router.register("affiliates", v.AffiliateViewSet, basename="affiliate")
router.register("membership-applications", v.MembershipApplicationViewSet, basename="membership-application")

# What We Do / Projects
router.register("services", v.ServiceViewSet, basename="service")
router.register("projects", v.ProjectViewSet, basename="project")

# News & Events
router.register("news", v.NewsPostViewSet, basename="news")
router.register("events", v.EventViewSet, basename="event")

# Resources
router.register("resources", v.ResourceViewSet, basename="resource")

# Opportunities
router.register("opportunities", v.OpportunityViewSet, basename="opportunity")
router.register("opportunity-applications", v.OpportunityApplicationViewSet, basename="opportunity-application")

# Contact
router.register("contact-messages", v.ContactMessageViewSet, basename="contact-message")

# Admin accounts
router.register("admin-users", v.AdminUserViewSet, basename="admin-user")

urlpatterns = router.urls
