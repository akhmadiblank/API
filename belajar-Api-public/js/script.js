function searchMovies(){
    $('#daftar-movies').empty()
   
    $.ajax({
        url:'http://www.omdbapi.com',
        dataType:'json',
        type:'get',
        data:{
            'apikey':'c187f342',
            's': $('#search-input').val()
        },
        success:function(result){
            // console.log(result.Response)
            if(result.Response=="True"){
                
                let movies=result.Search;
                // console.log(movies)
                $.each(movies,function(i,data){
                    $('#daftar-movies').append(`<div class="col-md-4 mt-4">
                    <div class="card">
                        <img src="${data.Poster}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${data.Title}</h5>
                            <p class="card-text">Category:${data.Type}</p>
                            <p class="card-text">Tahun rilis:${data.Year}</p>
                            <a href="#" class="btn btn-primary detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=${data.imdbID}>detail</a>
                        </div>
                    </div>
                </div>`)
                })

              

            }else{
                $('#daftar-movies').html(`
                <div class="col">
                 <h1 class="text-center">${result.Error}</h1>
                </div>
                `)
            }
        }

    });
}
// pencarian denga click
$('#search-button').on('click',function(){
    searchMovies();
});
//pencarian dengan enter
$('#search-input').on('keyup',function(e){
    if(e.which==13){
        searchMovies();
    }
});
$('#daftar-movies').on('click','.detail',function(){
    // console.log($(this).data('id'))->mengambil id masing masing
    $('.modal-body').empty()
    $.ajax({
        url:'http://www.omdbapi.com',
        dataType:'json',
        type:'get',
        data:{
            'apikey':'c187f342',
            'i': $(this).data('id')
        },
        success:function(result){
            //console.log(result)
            if(result.Response=="True"){
                $('.modal-body').append(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-4">
                            <img src="${result.Poster}" class="img-fluid"></img>
                        </div>
                        
                        <div class="col-lg-8">
                            <ul class="list-group">
                                <li class="list-group-item">Title:${result.Title}</li>
                                <li class="list-group-item">Writer:${result.Writer}</li>
                                <li class="list-group-item">Actors:${result.Actors}</li>
                                <li class="list-group-item">Sinopsis:${result.Plot}</li>
                            </ul>                        
                        </div>
                    </div>
                </div>
                `)
            }else{

            }

        }
    })
});