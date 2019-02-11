import json as json

from django.shortcuts import render
from django.forms.models import model_to_dict

from musicband.forms import MyLoginForm
from .models import Instrument
from django.views.generic.base import View


class MainView (View):
    template_name = "musicband/base.html"
    form = MyLoginForm()

    def get(self, request):
        """"Метод возвращает главную страницу и передаёт в контекст
        обьекты Instrument и словарь атрибутов этого обьекта"""
        if request.method == "GET":
            data = Instrument.objects.all()  # queryset всех обьектов Instrument в базе
            data = list(map(lambda x: model_to_dict(x), data))  # список (list)>(dict) всех обьектов Instrument в базе
            return render(request, self.template_name, context={'data': data, 'form': self.form})

    def post(self, request):
        """Метод для обработки информации посылаемой пользователем"""
        if request.method == "POST":
            json_dict = json.loads(request.POST["json_table"])  # конвертирует json в питоновский словарь dict
            get_dict = {k: v if v != '' else None for k, v in json_dict.items()}
            if get_dict["id"]:
                base_upd = Instrument.objects.filter(id=get_dict["id"])  # выбирает поле в базе для обновления по id
                base_upd.update(**get_dict)  # производит обновление нужного поля
                return render(request, self.template_name)
            else:
                new = Instrument.objects.create(**get_dict)  # если id нет создаёт новое поле
                return render(request, self.template_name)

    def delete(self, request):
        """Метод для удаления записи из базы"""
        if request.method == "DELETE":
            Instrument.objects.filter(id=request.DELETE['id']).delete()  # удаление поля базы
            return render(request, self.template_name)

