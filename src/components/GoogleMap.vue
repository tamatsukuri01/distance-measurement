<template>
  <div>
    <b-container style="max-width: 95%">
      <h3>ルート検索</h3>
      <b-row>
        <b-col md="6">
          <div class="image-input mx-auto">
            <div
              class="image-input__field"
              :class="{ over: isDragOver }"
              @dragover.prevent="onDrag('over')"
              @dragleave="onDrag('leave')"
              @drop.stop="onDrop"
              name="mainPhoto"
            >
              <!-- <div
              class="image-input__field"
              
              name="mainPhoto"
            >   -->
              <input
                v-if="!photo.image.src"
                name="mainPhoto"
                type="file"
                title
                @change="onChange"
              />
              <div v-if="photo.image.src">
                <img
                  :src="photo.image.src"
                  class="img-thumbnail d-flex mx-auto"
                  style="max-height: 280px"
                />
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  @click="deleteImage"
                ></button>
              </div>
              <p v-else>
                画像をドラッグ＆ドロップ
                <br />またはクリックでファイル選択
              </p>
            </div>
          </div>
        </b-col>
        <!-- </b-row>
      <b-row> -->
        <b-col md="6">
          <b-row class="mt-2">
            <b-col md="2">
              <label for="address"> 現在地住所: </label>
            </b-col>
            <b-col md="10">
              <b-form-input id="address" type="text" v-model="address" />
            </b-col>
            <!-- <b-row class="mt-1">
              <b-col 
                style="text-align:center;"
              >
                <b-button
                  size="sm"
                  style="width:50%;"
                  variant="primary"
                  type="button" 
                  @click="searchAddress"
                >
                  住所検索
                </b-button>
              </b-col>
            </b-row> -->

            <!-- </b-row>
          <b-row class="mt-2"> -->
            <!-- <b-col md="2">
              <label for="place">
                施設名:
              </label>
            </b-col>
            <b-col md="10">
              <b-form-input
                id="place"
                type="text" 
                v-model="place"
              />
            </b-col>
            <b-row class="mt-1">
              <b-col 
                style="text-align:center;"
              >
                <b-button
                  size="sm"
                  style="width:50%;"
                  variant="primary"
                  type="button" 
                  @click="searchPlace"
                >
                  施設名検索
                </b-button>
              </b-col>
            </b-row> -->
          </b-row>
          <!-- </b-col>

            
        <b-col> -->
          <b-row>
            <b-row class="mt-2">
              <b-col md="2">
                <label for="destinationAddress"> 目的地住所: </label>
              </b-col>
              <b-col md="10">
                <b-form-input
                  id="destinationAddress"
                  v-model="destinationAddress"
                  type="text"
                  readonly
                />
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col md="2">
                <label for="transportation">移動手段:</label>
              </b-col>
              <b-col md="auto">
                <select id="transportation" v-model="selected_transportation">
                  <option
                    v-for="item in transportation"
                    :value="item.key"
                    :key="item.key"
                  >
                    {{ item.value }}
                  </option>
                </select></b-col
              >
            </b-row>

            <b-row class="mt-2">
              <b-col md="2">
                <label for="distance">距離:</label>
              </b-col>
              <b-col md="auto">
                <b-form-input
                  id="distance"
                  v-model="distance"
                  type="text"
                  readonly
                />
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col md="2">
                <label for="time">時間:</label>
              </b-col>
              <b-col md="auto">
                <b-form-input id="time" v-model="time" type="text" readonly />
              </b-col>
            </b-row>
            <b-row class="mt-1">
              <b-col style="text-align: center">
                <b-button
                  size="sm"
                  style="width: 50%"
                  variant="primary"
                  type="button"
                  @click="getRoute"
                >
                  ルート検索
                </b-button>
              </b-col>
            </b-row>
          </b-row>
        </b-col>
      </b-row>
      <hr />
      <div ref="map" style="height: 300px; width: 100%"></div>
    </b-container>
  </div>
</template>

<script>
import { GoogleMapLoad } from "../mixins/googlemaploader";
import { UploadImage } from "../mixins/uploadImage";

export default {
  mixins: [GoogleMapLoad, UploadImage],
  data() {
    return {
      address: "",
      lat: 35.689677569206,
      lng: 139.692101,
      destinationLat: "",
      destinationLng: "",
      destinationAddress: "",
      distance: "",
      time: "",
      place: "",
      showImage: false,
      isDragOver: false,
      notExifData: false,
      photo: {
        remarks: "",
        image: "",
        imageName: "",
        uploadFile: [],
      },
      transportation: [
        { key: "DRIVING", value: "車" },
        { key: "BICYCLING", value: "自転車" },
        // {key:"TRANSIT",value:"交通機関"},
        { key: "WALKING", value: "徒歩" },
      ],
      selected_transportation: "WALKING",
    };
  },

  methods: {
    deleteImage() {
      this.endMapPin.setMap(null);
      this.photo.image = "";
      this.destinationLat = "";
      this.destinationLng = "";
      this.distance = "";
      this.time = "";
      this.directionsRenderer.setMap(null);
      this.destinationAddress = "";
    },
  },
  watch: {
    destinationLat: function () {
      if (this.destinationLat != "") {
        this.addMapPin();
      }
    },
  },
};
</script>

<style scoped>
.image-input {
  background-color: #eee;
  width: 100%;
  height: 300px;
}
.image-input__field {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-input__field.over {
  background-color: #666;
}
.image-input__field > input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
.image-input__field > p {
  color: #aaa;
  text-align: center;
}
</style>
