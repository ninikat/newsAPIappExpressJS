let newsList = $('#newsList')
var newsItemList = []

$('#btnSave').click(function(){
  let title = $('#titleTextBox').val()
  let description = $('#descriptionTextBox').val()
  let date = $('#dateTextBox').val()

  let data = {"title":title,"description":description,"publishedDate":date};

  $.ajax({
    url:"http://localhost:3000/news",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    type: "POST",
    dataType:"json",
    success: function(response){
      displayNewItems();
    }
  })
})

function displayNewItems(){
$('#newsList').html('');

  $.get("http://localhost:3000/",function(newsItems){
    //console.log(newsItems)
    newsItemList = newsItems

    $(newsItems).each(function(index,newsItem){
      let button=$('<button>')
      button.html('Delete').attr("secretId",newsItem.newsId).click(function(){
        let buttonId = this.getAttribute('secretId')
        let parentLi = this.closest('li')
        parentLi.remove()

        let newsItemToDelete = newsItemList.filter(function(newsItem){
          return newsItem.newsId == buttonId
        })[0]

        // this is the id that was matched in the function above
        console.log(newsItemToDelete.newsId)

        $.ajax({
          url:"http://localhost:3000/news",
          data: JSON.stringify({newsId :newsItemToDelete.newsId}), // {"newId":"3"}
          contentType: "application/json; charset=utf-8",
          type: "DELETE",
          dataType:"json",
          success: function(response){
            displayNewItems();
          }
        })

      });
      let itemLi = $('<li>')
      itemLi.html(newsItem.title + "-" + newsItem.pDate)
      button.appendTo(itemLi)
      itemLi.appendTo(newsList)
    })
  })
}

displayNewItems();
