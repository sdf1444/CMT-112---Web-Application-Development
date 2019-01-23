// GET request. Adapted from jQuery API documentation. Accessed 22/01/19. https://api.jquery.com/jQuery.get/
$(document).ready(function(){
    function assignDataToTable() {
        $("tbody").empty();
        $.ajax({
            type:"GET",
            contentType: "application/json",
            url: "http://127.0.0.1:3000/journals",
            success: function(data) {
                var users = JSON.parse(JSON.stringify(data));
                for (var i in users) {
                    $("tbody").
                    append("<tr> \
                                <td>" + users[i].id + "</td> \
                                <td>" + users[i].title + "</td> \
                                <td>" + users[i].journal + "</td> \
                                <td>" + users[i].issn + "</td> \
                                <td>" + users[i].createdAt + "</td> \
                                <td>" + users[i].updatedAt + "</td> \
                                <td> \ <button type='button' id='edit' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal'>Edit</button> \ <button id='delete' class='btn btn-danger'>Delete</button> </td> \
                            </tr>");
                }
            },
            error: function(data) {
                console.log(data);
                }
        });
        
    } 

    // Search function.
    $("#search").keyup(function(){
        var searchText = $(this).val().toLowerCase();
        // Show only matching TR, hide rest of them
        $.each($("#tblJournals tbody tr"), function() {
            if($(this).text().toLowerCase().indexOf(searchText) === -1)
               $(this).hide();
            else
               $(this).show();                
        });
    });     

    // POST request. Adapted from jQuery API documentation. Accessed 22/01/19. https://api.jquery.com/jQuery.post/
    $(document).ready(function () {
        var user = {};
        var dynamicURL = "";
        var methodName = "";
        $("#add").click(function () {
            user.title = $("#title").val();
            user.journal = $("#journal").val();
            user.issn = $("#issn").val();
            dynamicURL = "http://127.0.0.1:3000/journals"
            methodName = "POST";
            var userObj = JSON.stringify(user);
            $.ajax({
                url: dynamicURL,
                method: methodName,
                data: userObj,
                contentType: "application/json; charset=utf-8",
                success: function () {
                    alert("Added successfully");
                    assignDataToTable();
                    reset();
                },
                error: function (error) {
                    alert(error);
                }
            })
        })
    });  

    // Edit a entry.
    $('table').on('click', 'button[id="edit"]', function(e){
        var id = $(this).closest('tr').children('td:first').text();
        var title = $(this).closest('tr').children('td:nth-child(2)').text();
        var journal = $(this).closest('tr').children('td:nth-child(3)').text();
        var issn = $(this).closest('tr').children('td:nth-child(4)').text();
        var createdAt = $(this).closest('tr').children('th:nth-child(5)').text();
        var updatedAt = $(this).closest('tr').children('th:nth-child(6)').text();

            $("#title").val(title);
            $("#journal").val(journal);
            $("#issn").val(issn);

            $("#edit2").click(function() {
                var jsonVar = {
                    title: $("#title").val(),
                    journal: $("#journal").val(),
                    issn: $("#issn").val(),
                };

                // PUT request. Adapted from stackoverflow. Accessed 22/01/19. https://stackoverflow.com/questions/8032938/jquery-ajax-put-with-parameters
                $.ajax({
                    type:"PUT",
                    data: JSON.stringify(jsonVar),
                    contentType: "application/json",
                    url:"http://127.0.0.1:3000/journals/" + id,
                    success: function(data){
                        assignDataToTable();                        
                    },
                    error: function(err) {
                        console.log(err);
                        alert(err);
                    }
                
        });
        
    });

    })
    
    // DELETE request. Adapted rom jQuery API documentation. Accessed 22/01/19. http://api.jquery.com/jQuery.ajax/#options
    $('table').on('click', 'button[id="delete"]', function(e){
       var id = $(this).closest('tr').children('td:first').text();
       
       $.ajax({
            type:"DELETE",
            url:"http://127.0.0.1:3000/journals/" + id,
            success: function(data){
                alertUsing("Deleted.", true);
                assignDataToTable();
            },
            error: function(err) {  
                console.log(err);
                alert(err);
            }
        });

    })  
    
    assignDataToTable();

function alertUsing(text, flag) {
    var alert = $(".alert");

    if(flag){
        alert.removeClass("alert-danger").addClass("alert-success");
    }else{
        alert.removeClass("alert-success").addClass("alert-danger");
        
    }
    
    alert.fadeIn(400);
    alert.css("display", "block");
    alert.text(text);
    setTimeout(function() {
        alert.fadeOut();
    }, 2000);

  }

});