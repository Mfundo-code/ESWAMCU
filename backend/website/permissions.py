from rest_framework.permissions import SAFE_METHODS, BasePermission


def _is_staff(request):
    user = request.user
    return bool(user and user.is_authenticated and user.is_staff)


class IsStaffOrReadOnly(BasePermission):
    """
    Public content (news, projects, resources...):
      - GET/HEAD/OPTIONS -> anyone
      - POST/PUT/PATCH/DELETE -> staff (admin panel) users only
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return _is_staff(request)


class PublicCreateStaffManage(BasePermission):
    """
    For things the public submits but only staff may read back
    (contact enquiries, membership and job applications):
      - POST -> anyone (the public submitting a form)
      - everything else -> staff only
    """

    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return _is_staff(request)
