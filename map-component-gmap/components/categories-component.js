

var CategoriesComponent = React.createClass({

  mixins: [SortableMixin],
  sortableOptions: {
    ref: 'catList',
    model: 'categories',
  //  filter: ".currently-editing"
    handle: '.drag-handle',
    animation: 100,

  },
  handleStart: function() {
    this.setState({dragging:true})
  },
  handleEnd: function() {
    this.setState({dragging:false})
  },
  handleSort: function(evt, target) {
    var cats = this.state.categories;
    $(cats).each(function(index,e){
      if(e.order === evt.oldIndex ) {
        cats[index].order = evt.newIndex;
      }
    });
    cats.sort(function compare(a,b) {
      if (a.order < b.order)
        return -1;
      else if (a.order > b.order)
        return 1;
      else
        return 0;
    });
    this.setState({
      categories: cats
    });
    this.updateCat(cats);



  },
  orderer: function(items) {
    var ordered = [];
    $(items).each(function(index,e){
      e.order = index;
      ordered.push(e);
    });
    return ordered;
  },
  idGenerator: function(items) {
    var newID = 1;
    if(items.length > 0) {
      var highNum = 0;

      $(items).each(function(index, e){
        if(e.id > highNum) {
          highNum = e.id;
        }
      });
      newID = highNum+1;
    }
    return newID;
  },
  getInitialState: function() {
    return {
      points: INITIALPOINTS,
      categories: this.orderer(INITIALCATEGORIES),
      editing: false,
      disabled: false,
      dragging: false
    }
  },
  randomColor: function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  },
  addACat: function(e) {

    e.preventDefault();
    var currentCats = this.state.categories;
    var newCats = currentCats.concat([
      {
        id: this.idGenerator(currentCats),
        name:'',
        color: this.randomColor(),
        editing: true,
        newCat: true
      }
    ]);
    this.updateCat(newCats);

  },
  updateCat: function(newcategories) {
    var editing = false;
    $(newcategories).each(function(index,e){
      if(e.editing == true) {
        editing = true;
      }
    }.bind(this));

    $(APP).trigger('receiveFromCategories', [newcategories, editing]);
    this.setState({categories: newcategories, editing: editing});
  },
  deleteCat: function(badid, saved) {

    if(saved === true) {
      if(this.state.categories.length < 2) {
        alert("You need to have at least one category.");
        return false;
      }
      var cancel;
      $(this.state.points).each(function(index,e){
        if(e.cat == badid) {

          cancel = true;
        }
      });
      if(cancel) {
        alert("Sorry. You can't delete this category because some map points are using it. Delete those points or change their category.");
        return false;
      }
      var confirmed = confirm("Are you sure you want to delete this category? This can't be undone.");
      if(!confirmed) {
        return false;
      }

    }
    var currentCats = this.state.categories;
    var filteredPoints = currentCats.filter(function (el) {
                      return el.id !== badid;
                 });

    this.updateCat(filteredPoints);
  },
  setCat: function(point) {

    var currentPoints = this.state.categories;
    $(currentPoints).each(function(index, e){
      if(e.id == point.id) {
        currentPoints[index] = point;
      }
    });
    this.updateCat(currentPoints);

  },
  componentDidMount: function(){

    $(APP).on('receiveFromPoints', function(event,points,editing){
      this.setState({
        editing: editing,
        points: points
      })
    }.bind(this));

  },
  componentWillUnmount: function() {
    $(APP).off('receiveFromPoints');
  },
  render: function() {

    var newCat = <div className="footer">
                    <a href="#" disabled={this.state.editing} onClick={this.addACat} className="taxonomy-add-new">+ Add New Category</a>
                  </div>;


    var draggable = !this.state.editing;
    if(this.state.categories.length < 2) {
      draggable = false;
    }
    var catList = this.state.categories.map(function(cat){

      var catItem = false,
          catForm = false,
          catClass = 'categoryItem';
      if(cat.editing) {
        catClass = catClass+' currently-editing';
        catForm = <CatForm
                    name={cat.name}
                    color={cat.color}
                    id={cat.id}
                    newPoint={cat.newCat}
                    deleteCat={this.deleteCat}
                    saveCat={this.setCat}
                  />;
      }
      if(cat.name && !cat.editing) {
        catItem = <CatItem
                    canDrag={draggable}
                    name={cat.name}
                    color={cat.color}
                    id={cat.id}
                    deleteCat={this.deleteCat}
                    saveCat={this.setCat}
                  />;
      }
      return (
        <div className={catClass} key={cat.id} >
          {catItem}
          {catForm}

        </div>
      )
    }.bind(this));

    var serialized = JSON.stringify(this.state.categories);
    return(
      <div className="categories-component submitbox" data-dragging={this.state.dragging} data-editing={this.state.editing}>
        <input type="hidden" name="category_data" id="category_data" value={serialized} />
        <div className="category-list" ref="catList">
          {catList}
        </div>

        {newCat}
      </div>
    )
  }






});
