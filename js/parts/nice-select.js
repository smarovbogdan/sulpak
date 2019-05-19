function select() {

    $('select').niceSelect();

    $("select").change(function (e) {
        let group, id;
        group = $(this).find(':selected').data('group');
        id = $(this).find(':selected').data('id');
        url = $(this).find(':selected').data('url');
        if (url) window.open(url);
        if (group && id) {
            $('div[data-group="' + group + '"]')
                .first().children('div')
                .removeClass('active')
                .parent()
                .children('div[data-id="' + id + '"]')
                .addClass('active');
        }

    });
}

module.exports = select;