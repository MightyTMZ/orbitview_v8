from django.db import models
import uuid
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)  # email required and unique
    email_verified = models.BooleanField(default=False)
    # Optional: Store profile picture URL at user level too
    avatar_url = models.URLField(blank=True, null=True)
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Login tracking
    last_login_ip = models.GenericIPAddressField(blank=True, null=True)
    
    # USERNAME_FIELD defines what field is used for login
    USERNAME_FIELD = 'email'  # Use email for login instead of username
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']  # Required when creating superuser
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return self.email
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()



class OrbitViewProfile(models.Model):
    """Main profile model for OrbitView users"""

    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE,
        related_name='orbitview_profile'
    )
    
    # Primary identification
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.SlugField(max_length=100, unique=True, db_index=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    
    # Profile content
    byline = models.CharField(max_length=200, help_text="One-line professional description")
    about = models.TextField(help_text="Full prose about section")
    aboutlines = models.TextField(
        blank=True,
        null=True,
        help_text="Bullet points like 'World-class Engineer'"
    )
    nicknames = models.TextField(help_text="Comma-separated list of nicknames")
    skills = models.TextField(
        blank=True,
        null=True,
        help_text="Comma-separated skills"
    )
    
    # Values & Philosophy
    values = models.TextField(help_text="Core values like 'Move fast', 'Build in public'")
    working_style = models.TextField(
        blank=True,
        null=True,
        help_text="Prose description of working style"
    )
    
    # Looking For section
    looking_for_opportunities = models.TextField(
        blank=True,
        null=True,
        help_text="e.g., ['Co-founder', 'Internship']"
    )
    looking_for_ideal_role = models.CharField(max_length=200, blank=True, null=True)
    looking_for_deal_breakers = models.TextField(
        blank=True,
        null=True
    )
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=False)

    # Followers (for private accounts, only followers can interact with their OrbitView profile)
    followers = models.ManyToManyField(User)

    profile_completion = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    custom_domain = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="Premium feature: tom.dev instead of orbitview.com/tom"
    )
    
    # Analytics
    total_views = models.IntegerField(default=0)
    total_conversations = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'orbitview_profiles'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['username']),
            models.Index(fields=['is_public']),
        ]
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} (@{self.username})"


class ProfileImage(models.Model):
    """Model for profile pictures"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile = models.OneToOneField(
        OrbitViewProfile,
        on_delete=models.CASCADE,
        related_name='profile_picture'
    )
    image = models.ImageField(upload_to='profile_pictures/')
    url = models.URLField(help_text="CDN URL")
    alt = models.CharField(max_length=200, blank=True, null=True)
    width = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'profile_images'
    
    def __str__(self):
        return f"Profile picture for {self.profile.username}"


# ==================== Work/Projects Models ====================

class Work(models.Model):
    """Projects and work experiences"""
    
    STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('in-progress', 'In Progress'),
        ('archived', 'Archived'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile = models.ForeignKey(
        OrbitViewProfile,
        on_delete=models.CASCADE,
        related_name='works'
    )
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed')
    
    # Dates
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    
    # Categorization
    tags = models.TextField(
        blank=True,
        null=True,
        help_text="e.g., ['AI/ML', 'hackathon', 'climate-tech']"
    )
    tech_stack = models.TextField(
        models.CharField(max_length=50),
        blank=True,
        null=True,
        help_text="Technologies used: ['React', 'Python', 'OpenAI']"
    )
    
    # Impact
    impact = models.TextField(
        blank=True,
        null=True,
        help_text="Quantifiable results: '500+ users', 'Won 1st place'"
    )
    
    # Ordering
    display_order = models.IntegerField(default=0, help_text="For manual sorting")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'works'
        ordering = ['display_order', '-end_date', '-start_date']
        indexes = [
            models.Index(fields=['profile', 'status']),
            models.Index(fields=['display_order']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.profile.username}"


class WorkImage(models.Model):
    """Images for work/projects (cover and gallery)"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name='images')
    
    image = models.ImageField(upload_to='work_images/')
    url = models.URLField(help_text="CDN URL")
    alt = models.CharField(max_length=200, blank=True, null=True)
    width = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    
    is_cover = models.BooleanField(default=False)
    display_order = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'work_images'
        ordering = ['display_order']
    
    def __str__(self):
        return f"Image for {self.work.title}"


class WorkLink(models.Model):
    """Links associated with work/projects"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name='links')
    
    title = models.CharField(max_length=200, blank=True, null=True)
    url = models.URLField()
    display_order = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'work_links'
        ordering = ['display_order']
    
    def __str__(self):
        return f"{self.title or 'Link'} - {self.work.title}"


# ==================== Accomplishments ====================

class Accomplishment(models.Model):
    """Awards, certifications, publications, etc."""
    
    TYPE_CHOICES = [
        ('award', 'Award'),
        ('publication', 'Publication'),
        ('speaking', 'Speaking Engagement'),
        ('certification', 'Certification'),
        ('competition', 'Competition'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile = models.ForeignKey(
        OrbitViewProfile,
        on_delete=models.CASCADE,
        related_name='accomplishments'
    )
    
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200, help_text="Organization that issued this")
    description = models.TextField()
    date = models.DateField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    link = models.URLField(blank=True, null=True)
    
    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'accomplishments'
        ordering = ['display_order', '-date']
    
    def __str__(self):
        return f"{self.title} - {self.profile.username}"


# ==================== Social Links ====================

class SocialLink(models.Model):
    """Social media and external links"""
    
    PLATFORM_CHOICES = [
        ('linkedin', 'LinkedIn'),
        ('github', 'GitHub'),
        ('twitter', 'Twitter'),
        ('website', 'Personal Website'),
        ('other', 'Other'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile = models.ForeignKey(
        OrbitViewProfile,
        on_delete=models.CASCADE,
        related_name='social_links'
    )
    
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    url = models.URLField()
    username = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="e.g., '@tomsmith' for display"
    )
    
    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'social_links'
        ordering = ['display_order']
        unique_together = ['profile', 'platform']
    
    def __str__(self):
        return f"{self.platform} - {self.profile.username}"


# ==================== Context Files ====================

class ContextFile(models.Model):
    """Files uploaded for AI context (resumes, portfolios, etc.)"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile = models.ForeignKey(
        OrbitViewProfile,
        on_delete=models.CASCADE,
        related_name='context_files'
    )
    
    file = models.FileField(upload_to='context_files/')
    title = models.CharField(max_length=200)
    file_type = models.CharField(max_length=100, help_text="MIME type")
    size_bytes = models.BigIntegerField()
    
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'context_files'
        ordering = ['-uploaded_at']
    
    def __str__(self):
        return f"{self.title} - {self.profile.username}"


# ==================== Privacy Settings ====================

class PrivacySettings(models.Model):
    """Privacy configuration for profiles"""
    
    VISIBILITY_CHOICES = [
        ('private', 'Private - Only followers can view'),
        ('unlisted', 'Unlisted - Not indexed, but link works'),
        ('public', 'Public - Indexed and discoverable'),
    ]
    
    profile = models.OneToOneField(
        OrbitViewProfile,
        on_delete=models.CASCADE,
        related_name='privacy',
        primary_key=True
    )
    
    is_public = models.BooleanField(default=False)
    visibility = models.CharField(
        max_length=20,
        choices=VISIBILITY_CHOICES,
        default='private'
    )
    shareable_link_enabled = models.BooleanField(default=True)
    password_protected = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="Hashed password for extra privacy"
    )
    allowed_domains = models.JSONField(
        blank=True,
        null=True,
        help_text="Only people with emails from these domains can view"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) # can keep track the changes people make for their privacy settings
    
    class Meta:
        db_table = 'privacy_settings'
    
    def __str__(self):
        return f"Privacy settings for {self.profile.username}"
        


class AIPersonality(models.Model):
    """AI configuration for conversational profiles"""
    
    TONE_CHOICES = [
        ('professional', 'Professional'),
        ('casual', 'Casual'),
        ('friendly', 'Friendly'),
        ('witty', 'Witty'),
        ('technical', 'Technical'),
    ]
    
    RESPONSE_LENGTH_CHOICES = [
        ('concise', 'Concise'),
        ('balanced', 'Balanced'),
        ('detailed', 'Detailed'),
    ]
    
    profile = models.OneToOneField(
        OrbitViewProfile,
        on_delete=models.CASCADE,
        related_name='ai_personality',
        primary_key=True
    )
    
    tone = models.CharField(max_length=20, choices=TONE_CHOICES, default='professional')
    formality_level = models.IntegerField(
        default=5,
        validators=[MinValueValidator(1), MaxValueValidator(10)],
        help_text="1 = very casual, 10 = very formal"
    )
    response_length = models.CharField(
        max_length=20,
        choices=RESPONSE_LENGTH_CHOICES,
        default='balanced'
    )
    
    custom_instructions = models.TextField(
        blank=True,
        null=True,
        help_text="Custom instructions for AI behavior"
    )
    personality_traits = models.JSONField(
        blank=True,
        null=True,
        help_text="e.g., ['enthusiastic', 'humble', 'direct']"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'ai_personalities'
        verbose_name_plural = 'AI personalities'
    
    def __str__(self):
        return f"AI personality for {self.profile.username}"



class Conversation(models.Model):
    """Chat sessions with AI profiles"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile = models.ForeignKey(
        OrbitViewProfile,
        on_delete=models.CASCADE,
        related_name='conversations'
    )
    
    # Viewer info (can be anonymous)
    visitor_id = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="Anonymous session ID or authenticated user ID"
    )
    
    # AI personality overrides for this conversation
    ai_tone_override = models.CharField(
        max_length=20,
        choices=AIPersonality.TONE_CHOICES,
        blank=True,
        null=True
    )
    ai_formality_override = models.IntegerField(
        blank=True,
        null=True,
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    ai_response_length_override = models.CharField(
        max_length=20,
        choices=AIPersonality.RESPONSE_LENGTH_CHOICES,
        blank=True,
        null=True
    )
    
    started_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'conversations'
        ordering = ['-started_at']
        indexes = [
            models.Index(fields=['profile', '-started_at']),
            models.Index(fields=['visitor_id']),
        ]
    
    def __str__(self):
        return f"Conversation with {self.profile.username} - {self.started_at}"


class Message(models.Model):
    """Individual messages in conversations"""
    
    ROLE_CHOICES = [
        ('user', 'User'),
        ('assistant', 'Assistant'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name='messages'
    )
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'messages'
        ordering = ['timestamp']
        indexes = [
            models.Index(fields=['conversation', 'timestamp']),
        ]
    
    def __str__(self):
        return f"{self.role}: {self.content[:50]}..."


# ==================== Analytics ====================

class PopularQuestion(models.Model):
    """Track popular questions asked to profiles"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile = models.ForeignKey(
        OrbitViewProfile,
        on_delete=models.CASCADE,
        related_name='popular_questions'
    )
    
    question = models.TextField()
    count = models.IntegerField(default=1)
    
    first_asked = models.DateTimeField(auto_now_add=True)
    last_asked = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'popular_questions'
        ordering = ['-count']
        indexes = [
            models.Index(fields=['profile', '-count']),
        ]
    
    def __str__(self):
        return f"{self.question[:50]} ({self.count}x)"