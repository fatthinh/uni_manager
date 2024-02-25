from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from statistics import mean
from cloudinary.models import CloudinaryField
# Create your models here.


class User(AbstractUser):
    ROLES = (
        ('STUDENT', 'student'),
        ('LECTURER', 'lecturer'),
        ('PROVOST', 'provost'),
        ('MANAGER', 'manager')
    )
    role = models.CharField(choices=ROLES, max_length=100, null=True)
    avatar = CloudinaryField('avatar', null=True)

    def __str__(self):
        return self.get_full_name()


class BaseModel(models.Model):
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

# Thành viên hội đồng


class CouncilMembership(models.Model):
    ROLES = (
        ('CHAIRMAN', 'chairman'),
        ('SECRETARY', 'secretary'),
        ('REVIEWER', 'reviewer'),
        ('MEMBER', 'member')
    )

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, limit_choices_to={'role': 'lecturer'})
    council = models.ForeignKey(
        'Council', on_delete=models.CASCADE, related_name='users')
    council_role = models.CharField(max_length=100, choices=ROLES, null=True)

    def __str__(self):
        return str(self.id)

    class Meta:
        unique_together = ['user', 'council']

# Hội đồng


class Council(BaseModel):
    name = models.CharField(max_length=100, null=True)
    members = models.ManyToManyField(
        User, through=CouncilMembership, related_name='councils'
    )

    def __str__(self):
        return str(self.name)


class Thesis(BaseModel):
    MAJORS = (
        ('IT', 'Infomation Technology'),
        ('CS', 'Computer Science'),
        ('ENG', 'English Language'),
        ('MKT', 'Marketing'),
    )
    title = models.CharField(max_length=100)
    is_active = models.BooleanField(default=False)
    description = models.TextField(null=True, blank=True)
    files = models.FileField(upload_to='theses/%Y/%m')
    major = models.CharField(choices=MAJORS, max_length=200, null=True)

    council = models.ForeignKey(
        Council, related_name='theses', on_delete=models.SET_NULL, null=True, blank=True)
    students = models.ManyToManyField(
        User, related_name='theses', limit_choices_to={'role': 'student'})
    supervisors = models.ManyToManyField(
        User, related_name='supervised_theses', limit_choices_to={'role': 'lecturer'}, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        unique_together = ['title', 'council']


class Review(BaseModel):
    presentation_score = models.FloatField()
    content_score = models.FloatField()
    final_score = models.FloatField(null=True, blank=True)
    comment = models.TextField(null=True)

    reviewer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='reviews', limit_choices_to={'role': 'lecturer'})
    thesis = models.ForeignKey(
        Thesis, on_delete=models.CASCADE, related_name='reviews')

    def update_final_score(self):
        self.final_score = (self.presentation_score * 0.3) + \
            (self.content_score * 0.7)

    def save(self, *args, **kwargs):
        self.update_final_score()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.reviewer.get_full_name()
