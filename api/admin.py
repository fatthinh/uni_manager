from django.contrib import admin
from .models import Thesis, User, CouncilMembership, Review, Council
# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'full_name', 'role']

    @admin.display(description="Name")
    def full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'


class CouncilAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created_at', 'is_active']


class CouncilMembershipAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'council', 'council_role']


class ReviewAdmin(admin.ModelAdmin):
    list_display = ['reviewer', 'thesis', 'created_at']
    readonly_fields = ['final_score', 'reviewer', 'thesis']


admin.site.register(Thesis)
admin.site.register(User, UserAdmin)
admin.site.register(CouncilMembership, CouncilMembershipAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Council, CouncilAdmin)
