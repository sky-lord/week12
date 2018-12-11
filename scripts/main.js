const home = Vue.component('home', {
  data: function () {
    return {
      siteTitle: 'Itunes Searchenator 3000',
    }
  },
  template: `<div class="container"><h1>{{siteTitle}}</h1></div>`,
  methods: {
    
  }
});

const musicSearch = Vue.component('music-search', {
  data: function () {
    return {
    siteTitle: 'Itunes Searchenator 3000',
    songsArray: [
      'Grandma Got Ran Over By A Reindeer',
      'Silent Night',
      'Deck the Halls',
      '12 Days of Christmas',
      'Frosty vs Global Warming',
      'Jingle Bell Rock',
      'O Christmas Tree',
      'Christmas Can-Can',
      'Mama Kissing Santa'
    ],
    songsVisible: false,
    searchTerm: 'testing',
    songList: [],
    limit: 50,
    entity: 'song'
    }
  },
  template: `
    <div id="main">

      <input type="text" v-model="searchTerm">
      <input type="number" v-model="limit">
      <select v-model="entity">
        <option value="song">Songs</option>
        <option value="musicVideo">Videos</option>
      </select>
      <button v-on:click="getMusic()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Search</button>
      

      

      <div v-for="song in songList">
        <h1>{{song.trackName}}</h1>
        <img v-if="song.artworkUrl100" v-bind:src="song.artworkUrl100">
        <h4>{{song.artistName}}</h4>
        <audio v-if="song.previewUrl || song.previewUrl != '' || song.entity != null" controls>
          <source v-bind:src="song.previewUrl">
        </audio>
      </div>

    </div>
  `,
  methods: {
    getMusic(){
      fetch(`https://itunes.apple.com/search?term=${this.searchTerm}&limit=${this.limit}&entity=${this.entity}`)
      .then(data=> data.json() )
      .then(songs=> {
        this.songList = songs.results;
        console.log();
      });
    }
  }
});

const routes = [
{path:'/', component: home},
{path:'/search', component: musicSearch}
];

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.component('sidebar', {
  data: function () {
    return {
      sideBarTitle: 'this is a sidebar'
    }
  },
  template: `<div class="container"><h1 v-click:on="">{{sideBarTitle}}</h1><div class="sidebar">This is a sidebar</div></div>`,
  methods: {
    //
  }
});

const tunesApp = new Vue({
  router,
  el:'#tunesApp',
  data:{

    },
  methods:{
    
  }
});