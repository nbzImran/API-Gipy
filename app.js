$(document).ready(function() {
    const form = $('#search-gif');
    const search = $('.search');
    const gifArea = $("#gif-holder");
    const remove = $('#Remove')

    let searchTerm = '';
    let offset = 0;
    let isLoading = false;

form.on('submit', function(e) {
    e.preventDefault();
    searchTerm = search.val();
    offset = 0;
    gifArea.empty();
    fetchGifs();
})

async function fetchGifs() {
    if (isLoading) return;
    isLoading = true;
 try {
     const respose = await axios.get('https://api.giphy.com/v1/gifs/search', {
         params: {
             q: searchTerm,
             api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym',
             limit: 1,
             offset: 0
         }
     });
    respose.data.data.forEach(gifData => {
        const gifContainer = $('<div class="gif-container"></div>');
        const img = $('<img>').attr('src',gifData.images.original.url);
        const removeBtn = $('<button class="remove-btn>Erase</button>');
        removeBtn.on('click', () => {
            gifContainer.remove();
        })
        gifContainer.append(img).append(removeBtn);
        gifArea.append(gifContainer);
    });
    offset +=1;
    isLoading = false;
    
 } catch (error){
     alert('no gif found, please try again',error)
     isLoading = false;
 }
}

remove.on('click', () => {
    gifArea.empty();
})

})