import EXIF from "exif-js"
// import moment from "moment";
export const UploadImage = {
  data() {
    return {
      message: {
        file:'',
        notExif:'',
        notDate:''
      },
      isDragOver: false,
      drag:false,
      notExifData:false,
    }
  },
  methods:{
    
    //画像アップロード処理
    onDrag(type) {
      this.isDragOver = type === "over";
    },
    //ドラックアンドドロップで写真投稿時
    onDrop(event) {
      this.isDragOver = false;
      this.drag = true;
      this.message.file = ''
      this.notDate = ''
      const files = event.dataTransfer.files;
      // const formName = event.target.name;
      if (files.length !== 1 || files[0].type.indexOf("image") !== 0) {
        alert('画像ファイルをアップロードしてください')
        return
      } 
      if(files[0].type !== 'image/jpeg' ) {
        alert('写真はjpegファイルでアップロードしてください')
        return
      }
      this.getExif(files[0])
      // this.uploadImage(files,formName)
    },
    //クリックして写真投稿時
    onChange(event) {
      if(!this.drag) {
        this.message.file = ''
        this.notDate = ''
        const files = event.target.files;
        // const formName = event.target.name;
        if (files.length !== 1 || files[0].type.indexOf("image") !== 0) {
          alert('画像ファイルをアップロードしてください')
          return
        }
        if(files[0].type != 'image/jpeg' ) {
      
          alert('写真はjpegファイルでアップロードしてください')
          return
        }
        this.getExif(files[0])
        // this.uploadImage(files,formName)
      }
    },
    //写真アップロード
    uploadImage(files) {
      let self = this
      // if(formName === "mainPhoto") {
        // this.getExif(files[0]);
        let reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onload = function(e) {
          let img = new Image();
          img.onload = () => {
            let canvas = document.createElement('canvas');
            canvas.width = 2400;
            canvas.height = 1800;
            let ctx = canvas.getContext('2d');  
            ctx.drawImage(img, 0, 0, 2400, 1800);
            ctx.canvas.toBlob((blob) => {
            const imageFile = new File([blob], files.name, {
              type: files.type,
              lastModified: Date.now()
            });
              self.photo.uploadFile = imageFile;
            }, files.type, 1);
          }
          img.src = e.target.result;
          self.photo.image = img;
        };
    },
    
    //写真よりexif情報取得処理
    getExif(files) {
      var self = this;
      var lat = '';
      var lng = '';

      EXIF.getData(files, function() {
      
        let exifLat = EXIF.getTag(this, "GPSLatitude")
        if(typeof exifLat !== "undefined") {
          if(exifLat[0].numerator == 0) {
            exifLat = null
          }
        } else {
          exifLat = null
        }
        if(exifLat !== null ) {
          lat = EXIF.getTag(this, "GPSLatitude")
          lat = lat[0] + (lat[1] / 60) + (lat[2] /3600)
          lng = EXIF.getTag(this, "GPSLongitude")
          lng = lng[0] + (lng[1] / 60) + (lng[2] / 3600)
          
          self.destinationLat = lat
          self.destinationLng = lng
    
          self.uploadImage(files)
      
        } else {
    
          alert("緯度経度情報のない写真でした。")
          self.destinationLat = ""
          self.destinationLng = ""
          self.photo.image=""
          self.photo.uploadFile = []

        }
        
      });
      
    },
    //写真の持つ月より季節を取得
    checkSeason(month,formId) {
      var season = '';
      var self = this; 
      if(month == 3 || month == 4 || month == 5) {
        season = 1;
      }else if(month == 6 || month == 7 || month == 8) {
        season = 2;
      } else if(month == 9 || month == 10 || month == 11) {
        season = 3;
      }else if(month == 12 || month == 1 || month == 2) {
        season = 4;
      } else {
        season = 5
      }
      
      if(typeof formId === "undefined") {
        return self.photo.season = season
      }else {
        for(let i = 0; i < self.details.length; i++) {
            if(self.details[i].id == formId) {
            return self.details[i].season = season
          }
        }
      }
    },
    
    //写真の持つ時間より時間帯を取得
    checkShootTime(time,formId) {
      var shootTime = '';
      var self = this; 
      if(time == 6 || time == 7 || time == 8 || time == 9) {
        shootTime = 1;
      }else if(time == 10 || time == 11 || time == 12 || time == 13 || time == 14 || time == 15 ) {
        shootTime = 2;
      } else if(time == 16 || time == 17 || time == 18) {
        shootTime = 3;
      }else if(time == 19 || time == 20 || time == 21 || time == 22 || time == 23 || time == 24 
        || time == 1 || time == 2 || time == 3 || time == 4 || time == 5){
        shootTime = 4;
      } else {
        shootTime = 5;
      }
      
      if(typeof formId === "undefined") {
        return self.photo.time = shootTime
      } else {
        for(let i = 0; i < self.details.length; i++) {
            if(self.details[i].id == formId) {
            return self.details[i].time = shootTime
          }
        }
      }
    },
  },

}