<template>
  <v-footer dark height="auto">
    <v-card flat tile class="light-blue darken-1 white--text text-xs-center">
      <v-card-text class="py-0">
        <v-btn v-for="(media, i) in social" :key="i" class="mx-3 white--text" icon>
          <a v-bind:href="media.url" class="media-link"><v-icon size="24px">{{ media.icon }}</v-icon></a>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pb-2 pt-0">
        The To-do list on an article's talk page shows the list of improvements suggested for the article. It is created and formatted using the Todo template. The list is maintained by editors, writers, reviewers or readers like you as a way to focus your collaborative efforts. As such, they represent a tentative consensus that helps improve the efficiency of the editing process.
        To-do lists focus on improving otherwise adequate articles: tasks in to-do lists are important, significant, but not urgent (example: "insert a history section", or "provide more examples in the introduction").
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy;2018 — <strong>Muhamad Haddawi Hermawan</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>

export default {
    name: 'Footer',
    data: () => ({
      social: [ 
        {
          icon: 'fa-github',
          url: 'https://github.com/dawimuhammad'
        }, {
          icon: 'fa-twitter',
          url: 'https://twitter.com/dawimuhammad'
        }, {
          icon: 'fa-linkedin',
          url: 'https://www.linkedin.com/in/dawimuhammad/'
        }, {
          icon: 'fa-instagram',
          url: 'https://www.instagram.com/muhamadhaddawi/'
        }
      ]
    })
}
</script>

<style>
.media-link {
  color:aliceblue;
}
</style>
