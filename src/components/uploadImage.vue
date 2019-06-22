<template>
  <label class="c-upload">
    <img :src="imageProfile" alt="">
    <p>Formato válido (jpg, png), máximo 20MB</p>
    <input
      :disabled="disabledUpload"
      type="file"
      name=""
      @change="updateImage"
      ref="myFiles"
      accept="image/gif, image/jpeg, image/png"
    >
    <v-btn
      fab
      small
      color="error"
      v-if="disabledUpload"
      @click="removeImage"
    >
      <i class="icon-trash"></i>
    </v-btn>
  </label>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['image', 'type'],
  computed: {
    // ...mapState(['image'])
  },
  data () {
    return {
      imageId: null,
      // eslint-disable-next-line
      imageProfile: require('../assets/default-img.svg'),
      disabledUpload: false
    }
  },
  created () {
    if (this.image && this.image.id) {
      this.imageId = this.image.id
      this.disabledUpload = true
      this.imageProfile = this.image.url
    }
  },
  methods: {
    ...mapActions(['saveImage', 'deleleImage']),
    updateImage () {
      if (this.$refs.myFiles.files[0]) {
        let file = this.$refs.myFiles.files[0]

        let imageData = new FormData()
        imageData.append('type', this.type)
        imageData.append('photo', file)

        this.saveImage(imageData)
          .then(response => {
            this.imageProfile = response.link
            this.imageId = response.id
            this.disabledUpload = true
            this.$emit('image-resolve', this.imageId)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        console.log('la imagen no se cambio')
      }
    },
    removeImage () {
      this.deleleImage(this.imageId)
        .then(response => {
          // eslint-disable-next-line
          this.imageProfile= require('../assets/default-img.svg')
          console.log(response)
          this.disabledUpload = false
          this.$emit('image-resolve', null)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getImage () {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
