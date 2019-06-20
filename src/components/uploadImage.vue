<template>
  <label class="c-verify-entity__upload">
    <img :src="imageProfile" alt="">
    <p>Formato válido (jpg, png), máximo 20MB</p>
    <input
      required
      type="file"
      name=""
      @change="updateLocal"
      ref="myFiles"
      accept="image/gif, image/jpeg, image/png"
    >

  </label>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['image'])
  },
  data () {
    return {
      // eslint-disable-next-line
      imageProfile: require('../assets/default-img.svg')
    }
  },
  methods: {
    ...mapActions(['saveImage']),
    updateLocal () {
      if (this.$refs.myFiles.files[0]) {
        let file = this.$refs.myFiles.files[0]
        this.imageProfile = URL.createObjectURL(file)

        let imageData = new FormData()
        imageData.append('type', 'entity_logo')
        imageData.append('photo', file)

        this.saveImage(imageData)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        console.log('la imagen no se cambio')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
