/**
 * Created by zeusn_000 on 5/1/2016.
 */

var options = {
    valueNames: [ 'id', 'name', 'age', 'city','priority' ]
};


// Init list
var contactList = new List('contacts', options);

var queue = new PriorityQueue({ comparator: function(a, b) { return a.priority - b.priority; }});
var arr =[];
var idField = $('#id-field'),
    nameField = $('#name-field'),
    ageField = $('#age-field'),
    cityField = $('#city-field'),
    priorityField = $('#priority-field'),
    addBtn = $('#add-btn')      ,
    editBtn = $('#edit-btn').hide(),
    removeBtns = $('.remove-item-btn'),
    editBtns = $('.edit-item-btn'),
    sortBtn = $('#sort-btn');
    
// Sets callbacks to the buttons in the list
refreshCallbacks();
window.onload = function(){
    contactList.remove('id', 1);
}
sortBtn.click(function(){
   

    var size = arr.length;
    
    for(var x = 0; x < size; x++){
        queue.queue(arr[x]);
    }
    for(var x = 0; x < size; x++) {
        var lowest = queue.dequeue();
        contactList.remove('id', lowest.id);
        contactList.add({
            id: parseInt(lowest.id),
            name: lowest.name,
            age: lowest.age,
            city:lowest.city,
            priority: lowest.priority
        });
        refreshCallbacks();
    }

});
addBtn.click(function() {
    
    contactList.add({
        id: parseInt(idField.val()),
        name: nameField.val(),
        age: ageField.val(),
        city: cityField.val(),
        priority: priorityField.val()
    });
    var item = contactList.get('id', idField.val())[0].values();
    arr.push(item);
    clearFields();
    refreshCallbacks();
});

editBtn.click(function() {
    var item = contactList.get('id', idField.val())[0];
    item.values({
        id:idField.val(),
        name: nameField.val(),
        age: ageField.val(),
        city: cityField.val(),
        priority: priorityField.val()
    });
    clearFields();
    editBtn.hide();
    addBtn.show();
    removeBtns.show();
});

function refreshCallbacks() {
    // Needed to add new buttons to jQuery-extended object
    removeBtns = $(removeBtns.selector);
    editBtns = $(editBtns.selector);

    removeBtns.click(function() {
        var itemId = $(this).closest('tr').find('.id').text();
        
        var size = arr.length;
        for(var x = 0; x<size; x++ ){
            if(arr[x]){
                if(itemId == arr[x].id){
                 arr.splice(x,1);
                }
            }
        }
       
        
        contactList.remove('id', itemId);

    });

    editBtns.click(function() {
        var itemId = $(this).closest('tr').find('.id').text();
        var itemValues = contactList.get('id', itemId)[0].values();
        var size = arr.length;
        for(var x = 0; x<size; x++ ){
            if(arr[x]){
                if(itemId == arr[x].id){
                    arr.splice(x,1);
                }
            }
        }
        idField.val(itemValues.id);
        nameField.val(itemValues.name);
        ageField.val(itemValues.age);
        cityField.val(itemValues.city);
        priorityField.val(itemValues.priority);
        editBtn.show();
        addBtn.hide();
        removeBtns.hide();
        arr.push(itemValues);
    });
}

function clearFields() {
    idField.val(Math.floor(Math.random()*110000))
    nameField.val('');
    ageField.val('');
    cityField.val('');
    priorityField.val('');
}