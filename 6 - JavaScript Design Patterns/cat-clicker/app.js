/* Models */

var model = {
  currentCat: null,
  cats: [
    {
      clickCount: 0,
      name: 'Aisha',
      imgSrc: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426'
    },
    {
      clickCount: 0,
      name: 'Bob',
      imgSrc: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'
    },
    {
      clickCount: 0,
      name: 'Chi Chi',
      imgSrc: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454'
    }
  ],
  admin: false
};

/* Octopus */

var octopus = {
  init: function() {
    // set current cat to the first in the list
    model.currentCat = model.cats[0];
    
    // initialize the views
    catListView.init();
    catView.init();
    adminView.init();
  },
  
  getCurrentCat: function() {
    return model.currentCat;
  },
  
  getCats: function() {
    return model.cats;
  },
  
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },
  
  incrementCounter: function() {
    model.currentCat.clickCount++;
    catView.render();
  },
  
  adminState: function(state) {
    console.log(state);
    if (state) {
      model.admin = true;
      document.getElementById('admin').style.display = 'block';
    } else {
      model.admin = false;
      document.getElementById('admin').style.display = 'none';
    }
  }
};

/* Views */

var catView = {
  init: function() {
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.catCountElem = document.getElementById('cat-count');
    
    // increment counter on click
    this.catImageElem.addEventListener('click', function() {
      octopus.incrementCounter();
    });
    
    // update the view
    this.render();
  },
  
  render: function() {
    var currentCat = octopus.getCurrentCat();
    this.catCountElem.textContent = currentCat.clickCount;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.imgSrc;
  }
};

var catListView = {
  init: function() {
    this.catListElem = document.getElementById('cat-list');
    
    this.render();
  },
  
  render: function() {
    var cat, elem, i;
    var cats = octopus.getCats();
    
    this.catListElem.innerHTML = '';
    
    for (var i=0; i < cats.length; i++) {
      var cat = cats[i];
      
      var elem = document.createElement('li');
      elem.textContent = cat.name;
      
      // update counter
      elem.addEventListener('click', (function(catCopy) {
        return function() {
          octopus.setCurrentCat(catCopy);
          catView.render();
        }
      })(cat));
      
      this.catListElem.appendChild(elem);
    }
  }
};

var adminView = {
  init: function() {
    this.adminArea = document.getElementById("admin");
    octopus.adminState(false);
    
    this.render();
  },
  
  render: function() {
    var adminButton = document.getElementById('admin-mode');
    var cancelButton = document.getElementById('cancel');
    var saveButton = document.getElementById('save');
    var nameInput = document.getElementById('name');
    var imgurlInput = document.getElementById('imgurl');
    var clicksInput = document.getElementById('clicks');
    
    adminButton.addEventListener('click', function(e) {
      octopus.adminState(true);
      nameInput.value = model.currentCat.name;
      imgurlInput.value = model.currentCat.imgSrc;
      clicksInput.value = model.currentCat.clickCount;
    });
    
    cancelButton.addEventListener('click', function(e) {
      octopus.adminState(false);
      nameInput.value = '';
      imgurlInput.value = '';
      clicksInput.value = '';
    });
    
    saveButton.addEventListener('click', function(e) {
      model.currentCat.name = nameInput.value;
      model.currentCat.imgSrc = imgurlInput.value;
      model.currentCat.clickCount = clicksInput.value;
    });
  }
}

// run the app
octopus.init();