"""
python manage.py seed_defaults

Safe to run more than once. Creates:
  - the five "What We Do" areas and the home-page stats taken from the
    ESWAMCU requirements document (only if those tables are still empty), and
  - ONE local admin account (only if no superuser exists yet).

Everything else (leaders, affiliates, news, projects...) is added through the
admin panel at http://localhost:3000/admin so no invented content ends up on
the site.
"""
import os

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand

from core.models import ImpactStat, Service

SERVICES = [
    {
        "title": "Cooperative Development",
        "icon": "development",
        "summary": "Strengthening governance, management and institutional capacity.",
        "description": (
            "We help affiliated multipurpose cooperatives improve their governance, strengthen "
            "their financial and operational management, and build the skills of their leaders, "
            "managers and members through training and capacity building."
        ),
    },
    {
        "title": "Business Support",
        "icon": "business",
        "summary": "Advisory services that help cooperatives grow their enterprises.",
        "description": (
            "ESWAMCU provides business development support and advisory services so that "
            "cooperatives can expand their business activities and build sustainable "
            "income-generating activities."
        ),
    },
    {
        "title": "Agriculture",
        "icon": "agriculture",
        "summary": "Promoting agricultural production and cooperative agribusiness.",
        "description": (
            "We promote agricultural production and cooperative agribusiness, supporting "
            "food security and rural livelihoods across Eswatini."
        ),
    },
    {
        "title": "Finance Facilitation",
        "icon": "finance",
        "summary": "Opening doors to finance, markets, technology and resources.",
        "description": (
            "We facilitate access to finance, markets, technology and productive resources, "
            "and mobilise resources for cooperative development programmes through "
            "partnerships with financial service providers and development partners."
        ),
    },
    {
        "title": "Property Management",
        "icon": "property",
        "summary": "Property management services for the Union and its affiliates.",
        "description": "Property management services supporting the Union and the cooperative movement.",
    },
]

STATS = [
    {"value": "2006", "label": "Year established", "caption": "A collective voice for multipurpose cooperatives"},
    {"value": "12", "label": "Mandate objectives", "caption": "From representation to digital transformation"},
    {"value": "5", "label": "Core values", "caption": "Delivery, respect, integrity, competency, inclusivity"},
]


class Command(BaseCommand):
    help = "Load starter content from the requirements document and create a local admin account."

    def handle(self, *args, **options):
        if not Service.objects.exists():
            for i, data in enumerate(SERVICES):
                Service.objects.create(order=i, **data)
            self.stdout.write(self.style.SUCCESS(f"Created {len(SERVICES)} 'What We Do' areas."))

        if not ImpactStat.objects.exists():
            for i, data in enumerate(STATS):
                ImpactStat.objects.create(order=i, **data)
            self.stdout.write(self.style.SUCCESS(f"Created {len(STATS)} home-page stats."))

        if not User.objects.filter(is_superuser=True).exists():
            username = "admin"
            password = "admin12345"
            User.objects.create_superuser(username=username, email="", password=password)
            self.stdout.write(
                self.style.WARNING(
                    f"Created LOCAL admin '{username}' with password '{password}'. "
                    "Change it in the admin panel (Admins) before sharing this project."
                )
            )