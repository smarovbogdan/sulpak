function searchButton() {

	function searchButton() {
        if(window.innerWidth < 769){
            let mainSearch = document.querySelector('.main_search');
            let searchFixed = document.querySelector('.header_search-fixed');

            const toggleMenu = () => {
                mainSearch.classList.toggle('active');
            }

            mainSearch.addEventListener('click', e => {
               e.stopPropagation();
                if(e.target.getAttribute('id') && e.target.getAttribute('id') === 'search'){
                } else {
                    toggleMenu();
                }

            });

            document.addEventListener('click', e => {
                let target = e.target;
                let itsMenu = target == searchFixed ;
                let itsMainSearch = target == mainSearch || mainSearch.contains(target);
                let menuIsActive = mainSearch.classList.contains('active');

                if (!itsMenu && !itsMainSearch && menuIsActive ) {
                toggleMenu();
                } 
            })
        }
       
    }
    searchButton()

    $('#search').click(function(e) {
        e.preventDefault();
        $('.digi-autocomplete-container').show();
    });
    $(document).on('click', function(e) {
      if (!$(e.target).closest('.main_search').length) {
        $('.digi-autocomplete-container').hide();
      }
      e.stopPropagation();
    });
    if(window.innerWidth < 769){
        $('.header_search-fixed').click(function(e) {
         e.preventDefault();

        $('.digi-autocomplete-container-md').show();
         });

        $(document).on('click', function(e) {
            if (!$(e.target).closest('.header_search-fixed').length) {
                $('.digi-autocomplete-container-md').hide();
            }
            e.stopPropagation();
        });
    }
}

module.exports = searchButton;