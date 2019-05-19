function tabs() {
     // Табы
    $('.tab_header-item').click(function (event) {
        let group, id;
        group = this.dataset.group;
        id = this.dataset.id;
        $(this).parent().children('.tab_header-item').removeClass('active');
        $(this).addClass('active');
        $('div[data-group="' + group + '"]').each(function (e) {
            $(this).children('div')
                .removeClass('active')
                .parent()
                .children('div[data-id="' + id + '"]')
                .addClass('active');
        })
    });
}

module.exports = tabs;