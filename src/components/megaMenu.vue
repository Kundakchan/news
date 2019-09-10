<template>
  <nav class="uk-navbar-container uk-red uk-navbar-transparent uk-light" uk-navbar>
    <div class="uk-navbar-left">
      <ul class="uk-navbar-nav">
        <li v-for="(item, index) in catecoris" :key="index"><a :href="item.path">{{ item.name }}</a>
          <div v-if="item.children" class="uk-navbar-dropdown" uk-drop="boundary: !nav; boundary-align: true; pos: bottom-justify;">
           <div class="uk-navbar-dropdown-grid uk-child-width-1-2" uk-grid>
             <div>
               <ul class="uk-nav uk-navbar-dropdown-nav">
                 <li class="uk-active"><a href="#">Active</a></li>
                 <li><a href="#">Item</a></li>
                 <li class="uk-nav-header">Header</li>
                 <li><a href="#">Item</a></li>
                 <li><a href="#">Item</a></li>
                 <li class="uk-nav-divider"></li>
                 <li><a href="#">Item</a></li>
               </ul>
             </div>
           </div>
         </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      catecoris: [
        {
          name: 'Видео',
          path: '/video'
        },
        {
          name: 'Машины',
          path: '/car',
          children: [
            {
              name: 'BMW',
              path: '/bmw'
            },
            {
              name: 'mazda',
              path: '/mazda'
            },
            {
              name: 'ford',
              path: '/ford'
            },
            {
              name: 'nisan',
              path: '/nisan'
            },
            {
              name: 'lada',
              path: '/lada'
            }
          ]
        },
        {
          name: 'programing lenght',
          path: '/programing-lenght'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.uk-red {
  background-color: rgb(49, 49, 49);
}
</style>
