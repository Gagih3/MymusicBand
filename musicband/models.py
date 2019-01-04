from django.db import models
from django.utils import timezone


class Instrument(models.Model):
    """Модель элемента музыкального инвенторя"""
    instrument_name = models.CharField(max_length=100)
    instrument_property = models.TextField(max_length=150, blank=True)
    inventory_id = models.CharField(max_length=10)
    instrument_type = models.CharField(max_length=25)
    kit_type = models.CharField(max_length=15)
    kit_count = models.SmallIntegerField()
    pub_date = models.DateTimeField(default=timezone.now)
    responsible = models.CharField(max_length=60, blank=True)

    def __str__(self):
        return f"{self.instrument_name}"


class KitElement(models.Model):
    """Модель элемента комплекта для элементов инвенторя"""
    element_name = models.CharField(max_length=60)
    element_property = models.CharField(max_length=100)
    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.element_name}"


class Comments(models.Model):
    """Комментарии"""
    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE, blank=True)
    kit_element = models.ForeignKey(KitElement, on_delete=models.CASCADE, blank=True)
    comment_text = models.TextField(max_length=250)
    pub_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.pub_date}|{self.comment_text[0:20]}"


class Position(models.Model):
    """Должность"""
    position_name = models.CharField(max_length=30)
    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.position_name}"


class Problems(models.Model):
    """Модель проблем с музыкальным инвентарём"""
    problem_status = models.CharField(max_length=20)
    problem_pub_date = models.DateField(default=timezone.now)
    problem_name = models.TextField(max_length=250)
    problem_planed_decisions = models.TextField(max_length=250)
    problem_planed_cost_min = models.SmallIntegerField()
    problem_planed_cost_max = models.SmallIntegerField()
    priority = models.SmallIntegerField()
    decision_deadline = models.DateField()
    problem_final_cost = models.SmallIntegerField()
    problem_final_decision = models.TextField(max_length=250)
    problem_closer = models.CharField(max_length=80)
    problem_close_date = models.DateField()
    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE, blank=True)
    kit_element = models.ForeignKey(KitElement, on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return f"{self.problem_name}|{self.problem_pub_date}"


