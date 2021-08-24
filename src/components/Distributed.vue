<template>
  <div>
    <baidu-map class="map" :center="mapCenter" :zoom="15" :scroll-wheel-zoom="true">
      <bm-point-collection
        :points="mapPoints"
        shape="BMAP_POINT_SHAPE_STAR"
        color="red"
        size="BMAP_POINT_SIZE_BIGGER"
      ></bm-point-collection>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
    </baidu-map>
  </div>
</template>

<script>
export default {
  name: "Distributed",
  data() {
    return {
      mapCenter: { lng: 114.895, lat: 32.0117 },
      mapPoints: [],
    };
  },
  created(){
    this.$http.post("/queryAllRepository").then((res)=>{
      // console.log(res)
      this.mapPoints=res.data.points
    })
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 500px;
}
</style>