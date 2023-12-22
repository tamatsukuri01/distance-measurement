<template>
  <div>
    <b-row>
      <b-col >
        <div class="image-input mx-auto">
          <div
            class="image-input__field"
            :class="{'over': isDragOver}"
            @dragover.prevent="onDrag('over')"
            @dragleave="onDrag('leave')"
            @drop.stop="onDrop"
            name="mainPhoto"
          >  
            <input 
              v-if="!photo.image.src" 
              name="mainPhoto" 
              type="file" 
              title 
              @change="onChange"
            >
            <div v-if="photo.image.src">
              
              <img 
                :src="photo.image.src" 
                class="img-thumbnail d-flex mx-auto" 
                style="max-height: 280px;"
              >
              <button 
                type="button" 
                class="btn-close" 
                aria-label="Close" 
                @click="deleteImage"
              ></button>
            </div>
            <p v-else>画像をドラッグ＆ドロップ
              <br>またはクリックでファイル選択
            </p>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  
}
</script>