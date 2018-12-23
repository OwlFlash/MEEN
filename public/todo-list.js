$(document).ready(function () {

    $('form').on('submit', function () {

        var item = $('form input');
        var todo = {
            item: item.val()
        };

        $.ajax({
            type: 'POST',
            url: '/logged',
            data: todo,
            success: function (data) {
                location.reload();
            }
        });

        return false;
    });

    $('.delete-button').on('click', function () {
        console.log(this);
        var item = $(this).parent().text().replace(/ /g, '-');

        $.ajax({
            type: 'DELETE',
            url: '/logged/' + item,
            success: function (data) {
                location.reload();
            }
        });
    });
    // Update do dokonczenia
    // $('li').on('click', function () {
    //     var item = $(this).text().replace(/ /g, '-');
    //     var todo = {
    //         item: 'Update'
    //     };
    //     $.ajax({
    //         type: 'PUT',
    //         url: '/logged/' + item,
    //         data: todo,
    //         success: function (data) {
    //             location.reload();
    //         }
    //     });
    // });

});