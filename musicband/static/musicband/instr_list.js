var csrftoken = Cookies.get("csrftoken"); // получает токен безопасности
// Операции над таблицой данных
    $("table").click(function (event) {
        // Функция включения редактирования таблицы
        if ($(event.target).is(".fas.fa-edit")){
            var td = $(event.target).parent().siblings("td").not(":last-child");
            if (td.attr("contenteditable")){
                td.removeAttr("contenteditable");
                td.toggleClass("skyblue");
                $(event.target).siblings(".fas.fa-save").replaceWith("<i class=\"fas fa-trash-alt\"></i>");
            }else {
                td.not(":nth-child(8)").attr("contenteditable","True");
                td.toggleClass("skyblue");
                $(event.target).siblings(".fas.fa-trash-alt").replaceWith("<i class=\"fas fa-save\"></i>");
            };
        };
        // если нажата кнопка сохранить отпаравляет request.POST со словарём из ячеек таблицы (работает только в редактируемом поле)
        if ($(event.target).is(".fas.fa-save")){
            var st = $(event.target).parent().siblings("td:not(:last-child):not(:nth-child(8))");
            if(st.attr("contenteditable")){
                var dit = {};
                st.map(function (k,v) {return dit[v.dataset.key] = v.innerText}); // создаёт словарь ключ значение из текущей строки на сайт
                dit = JSON.stringify(dit); // перводит в JSON полученый ранее словарь
                $.post("",{csrfmiddlewaretoken:csrftoken, json_table:dit},function () {
                            $("#main_table").load(document.URL + " #main_table_content") //обновляет тело таблице после сохранения
                        }); // отправляет данные методом ajax POST
                let td = $(event.target).parent().siblings("td").not(":last-child");
                td.removeAttr("contenteditable");
                td.toggleClass("skyblue");
                $(event.target).replaceWith("<i class=\"fas fa-trash-alt\"></i>");

            };
        };
        //Функция добавления нового инструмента
        if ($(event.target).is(".fas.fa-plus-square")){
            var new_tr_html = "<tr>\n" +
                "<td data-key=\"id\" class=\"skyblue\" contenteditable='true' style=\'display:none;\'></td>\n" +
                "<td data-key=\"instrument_name\" class=\"skyblue\" contenteditable=\'true\'></td>\n" +
                "<td data-key=\"instrument_property\" class=\"skyblue\" contenteditable='true'></td>\n"+
                "<td data-key=\"inventory_id\" class=\"skyblue\" contenteditable='true'></td>\n"+
                "<td data-key=\"instrument_type\" class=\"skyblue\" contenteditable='true'></td>\n"+
                "<td data-key=\"kit_type\" class=\"skyblue\" contenteditable='true'></td>\n"+
                "<td data-key=\"kit_count\" class=\"skyblue\" contenteditable='true'></td>\n"+
                "<td data-key=\"pub_date\" class=\"skyblue\"></td>\n"+
                "<td data-key=\"responsible\" class=\"skyblue\" contenteditable='true'></td>\n"+
                "<td>\n" +
                "<i class=\"fas fa-edit\"></i>\n" +
                "<i class=\"fas fa-trash-alt\"></i>\n" +
                "</td>"
                "</tr>"
            $("tbody").append(new_tr_html);
        };
        // Функция удаления поля из базы и из html для вновь созданных полей
        if ($(event.target).is(".fas.fa-trash-alt")){
            var del_btn = $(event.target);
            $("body").append("<div class=\'shadow\'></div>\n" +
                "<div class=\'confirm-delete\'>\n" +
                "<p>Вы точно хотите удалить этот пункт?</p>\n" +
                "<button class=\'yes\'>Yes</button>\n" +
                "<button class=\'no\'>No</button>\n"+
                "</div>"
            );
            $("div.confirm-delete").click(function (event) {
                if ($(event.target).is("button.no")){
                    $("div.shadow").remove();
                    $("div.confirm-delete").remove();
                };
                if ($(event.target).is("button.yes")){
                    del_btn.parent().parent().remove();
                    var id = del_btn.parent().parent().attr("id");
                    $("div.shadow").remove();
                    $("div.confirm-delete").remove();
                    $.ajax({
                        type:'DELETE',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({"id":id}),
                        dataType: 'text',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("X-CSRFToken", csrftoken);
                        },
                        success: function () {
                            $("#main_table").load(document.URL + " #main_table_content") //обновляет тело таблице после сохранения
                        },
                    });
                };
            });
        };
    });

