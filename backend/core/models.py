from django.db import models
from django.utils import timezone


# ====================================================================
# HOME — impact statistics shown on the home page
# ====================================================================

class ImpactStat(models.Model):
    """A headline figure on the home page, e.g. value '2006', label 'Established'."""

    value = models.CharField(max_length=30, help_text="Shown big, e.g. '2006' or '120+'")
    label = models.CharField(max_length=100, help_text="e.g. 'Year established'")
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.value} {self.label}"


# ====================================================================
# LEADERSHIP — Board of Directors, Management, Governance
# ====================================================================

class LeadershipMember(models.Model):
    class Category(models.TextChoices):
        BOARD = "board", "Board of Directors"
        MANAGEMENT = "management", "Management"
        GOVERNANCE = "governance", "Governance"

    name = models.CharField(max_length=150)
    position = models.CharField(max_length=150, help_text="e.g. 'Chairperson', 'Chief Executive Officer'")
    category = models.CharField(max_length=20, choices=Category.choices)
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to="leadership/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["category", "order", "name"]

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


# ====================================================================
# OUR AFFILIATES — directory + membership applications
# ====================================================================

class Affiliate(models.Model):
    """A multipurpose cooperative affiliated to ESWAMCU (the cooperative directory)."""

    class Region(models.TextChoices):
        HHOHHO = "hhohho", "Hhohho"
        MANZINI = "manzini", "Manzini"
        SHISELWENI = "shiselweni", "Shiselweni"
        LUBOMBO = "lubombo", "Lubombo"

    name = models.CharField(max_length=255)
    region = models.CharField(max_length=20, choices=Region.choices, blank=True)
    town = models.CharField(max_length=150, blank=True)
    activities = models.CharField(max_length=255, blank=True, help_text="e.g. 'Savings & credit, farming inputs'")
    description = models.TextField(blank=True)
    contact_person = models.CharField(max_length=150, blank=True)
    phone = models.CharField(max_length=40, blank=True)
    email = models.EmailField(blank=True)
    website_url = models.URLField(blank=True)
    logo = models.ImageField(upload_to="affiliates/", blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class MembershipApplication(models.Model):
    """'Join us' enquiry submitted by a cooperative that wants to affiliate."""

    class Status(models.TextChoices):
        NEW = "new", "New"
        IN_REVIEW = "in_review", "In review"
        APPROVED = "approved", "Approved"
        DECLINED = "declined", "Declined"

    cooperative_name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    region = models.CharField(max_length=20, choices=Affiliate.Region.choices, blank=True)
    message = models.TextField(blank=True)
    supporting_document = models.FileField(upload_to="membership/", blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-submitted_at"]

    def __str__(self):
        return f"{self.cooperative_name} ({self.get_status_display()})"


# ====================================================================
# WHAT WE DO
# ====================================================================

class Service(models.Model):
    class Icon(models.TextChoices):
        DEVELOPMENT = "development", "Cooperative development"
        BUSINESS = "business", "Business support"
        AGRICULTURE = "agriculture", "Agriculture"
        FINANCE = "finance", "Finance"
        PROPERTY = "property", "Property"
        GENERAL = "general", "General"

    title = models.CharField(max_length=200)
    summary = models.CharField(max_length=300, blank=True, help_text="One-line summary for cards")
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=20, choices=Icon.choices, default=Icon.GENERAL)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


# ====================================================================
# PROJECTS
# ====================================================================

class Project(models.Model):
    class Category(models.TextChoices):
        AGRICULTURE = "agriculture", "Agricultural programme"
        FINANCING = "financing", "Financing initiative"
        OTHER = "other", "Other project"

    class Status(models.TextChoices):
        PLANNED = "planned", "Planned"
        ONGOING = "ongoing", "Ongoing"
        COMPLETED = "completed", "Completed"

    title = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=Category.choices, default=Category.OTHER)
    summary = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ONGOING)
    start_date = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-start_date", "title"]

    def __str__(self):
        return self.title


# ====================================================================
# NEWS & EVENTS
# ====================================================================

class NewsPost(models.Model):
    class Category(models.TextChoices):
        NEWS = "news", "News"
        ANNOUNCEMENT = "announcement", "Announcement"

    title = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=Category.choices, default=Category.NEWS)
    summary = models.CharField(max_length=300, blank=True)
    body = models.TextField(blank=True)
    image = models.ImageField(upload_to="news/", blank=True, null=True)
    file = models.FileField(upload_to="news/files/", blank=True, null=True, help_text="Optional attachment")
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["-published_at"]

    def __str__(self):
        return self.title


class Event(models.Model):
    """'is_upcoming' is derived from event_date, so it never needs manual updating."""

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    event_date = models.DateTimeField()
    cover_photo = models.ImageField(upload_to="events/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-event_date"]

    def __str__(self):
        return self.title

    @property
    def is_upcoming(self):
        return self.event_date >= timezone.now()


# ====================================================================
# RESOURCES — reports, forms, policies, publications
# ====================================================================

class Resource(models.Model):
    class Category(models.TextChoices):
        REPORT = "report", "Report"
        FORM = "form", "Form"
        POLICY = "policy", "Policy"
        PUBLICATION = "publication", "Publication"

    title = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=Category.choices)
    description = models.TextField(blank=True)
    year = models.PositiveIntegerField(blank=True, null=True)
    file = models.FileField(upload_to="resources/")
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["category", "-year", "-created_at"]

    def __str__(self):
        return f"{self.get_category_display()}: {self.title}"


# ====================================================================
# OPPORTUNITIES — vacancies, tenders, partnerships, business opportunities
# ====================================================================

class Opportunity(models.Model):
    class Kind(models.TextChoices):
        VACANCY = "vacancy", "Vacancy"
        TENDER = "tender", "Tender"
        PARTNERSHIP = "partnership", "Partnership"
        BUSINESS = "business", "Business opportunity"

    title = models.CharField(max_length=255)
    kind = models.CharField(max_length=20, choices=Kind.choices, default=Kind.VACANCY)
    summary = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    requirements = models.TextField(blank=True)
    closing_date = models.DateField(blank=True, null=True, help_text="Optional - last day to respond")
    file = models.FileField(upload_to="opportunities/", blank=True, null=True, help_text="Optional tender document / job advert")
    is_active = models.BooleanField(default=True)
    posted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-posted_at"]
        verbose_name_plural = "Opportunities"

    def __str__(self):
        return f"{self.get_kind_display()}: {self.title}"


class OpportunityApplication(models.Model):
    """An application / expression of interest against an Opportunity."""

    class Status(models.TextChoices):
        NEW = "new", "New"
        REVIEWED = "reviewed", "Reviewed"
        SHORTLISTED = "shortlisted", "Shortlisted"
        REJECTED = "rejected", "Rejected"
        ACCEPTED = "accepted", "Accepted"

    opportunity = models.ForeignKey(
        Opportunity, on_delete=models.SET_NULL, null=True, blank=True, related_name="applications"
    )
    full_name = models.CharField(max_length=150)
    organisation = models.CharField(max_length=200, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    message = models.TextField(blank=True)
    document = models.FileField(upload_to="opportunity_applications/", blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-submitted_at"]

    def __str__(self):
        title = self.opportunity.title if self.opportunity else "General"
        return f"{self.full_name} - {title}"


# ====================================================================
# CONTACT US — enquiry form
# ====================================================================

class ContactMessage(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "New"
        IN_PROGRESS = "in_progress", "In progress"
        RESOLVED = "resolved", "Resolved"

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-submitted_at"]

    def __str__(self):
        return f"{self.full_name} ({self.submitted_at:%Y-%m-%d})"
