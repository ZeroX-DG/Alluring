<template>
  <div>
    <section class="section">
      <b-field label="How many images to display">
        <b-input v-model.number="numberOfImage" :value="numberOfImage"></b-input>
      </b-field>
    </section>
    <div class="columns is-multiline" id="images">
      <div class="column is-one-quarter" v-for="n in numberOfImage">
        <img 
          :src="'https://source.unsplash.com/random/' + size + '?sig=' + n" 
          class="image"
          @click="setAsBackground">
      </div>
    </div>
  </div>
</template>

<script>
import wallpaperExE from 'wallpaper/lib/win-wallpaper.exe';
import os from 'os';
import wallpaper from 'wallpaper';
import fs from 'fs';
import path from 'path';
export default {
  data(){
    return {
      numberOfImage: 10,
      width: window.screen.width,
      height: window.screen.height
    }
  },
  methods:{
    convertToBase64(img){
      let canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      let context = canvas.getContext("2d");
      context.drawImage(img, 0, 0);
      let dataURL = canvas.toDataURL("image/jpg");
      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    },
    setAsBackground(event){
      let base64Image = this.convertToBase64(event.target);
      let picturePath = path.join(os.homedir(), "/Pictures", "background.jpg");
      picturePath = path.normalize(picturePath);
      fs.writeFile(picturePath, base64Image, 'base64', (err) => {
        wallpaper.set(picturePath, {scale: "stretch"})
        .then(() => {
          console.log(path.resolve(picturePath));
          this.$snackbar.open("Done !");
        });
      });
    }
  },
  computed:{
    size(){
      return this.width + 'x' + this.height;
    }
  }
}
</script>

<style lang="scss">
  #images{
    padding: 5px;
  }
  .image:hover{
    transition: all 0.3s;
    box-shadow: 0 0.3125rem 1rem 0 rgba(0,0,0,0.4);
  }
</style>
