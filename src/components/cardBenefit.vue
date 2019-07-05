<template>
  <div class="c-card-benefit">
    {{ initConsole }}
    <div class="c-card-benefit__entity"
      v-for="(item, index) in entities"
      :key="index"
    >
      <v-btn fab small color="primary">
        <v-icon>remove</v-icon>
      </v-btn>
      <div class="c-card-benefit__entity__header">
        <p class="c-card-benefit__entity__type">
          <b>Tipo: </b>{{ nameTypeBenecifiary(item.type_beneficiary_id) }}
        </p>
        <span class="c-card-benefit__entity__name">{{ item.name }}</span>
        <ul class="c-card-benefit__entity__address"
        >
          <li>La {{ nameRegionBeneficiary(item.region_id) }} / {{ nameProvinceBeneficiary(item.province_id) }} / {{ nameDistrictBeneficiary(item.district_id) }}</li>
        </ul>
      </div>
      <v-btn fab small color="primary">
        <v-icon>edit</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['entities'],
  computed: {
    ...mapGetters(['getRegion', 'getProvince', 'getDistrict', 'getTypeBeneficiary']),
    nameTypeBenecifiary (typeBeneficiary) {
      console.log(typeBeneficiary)
      return this.getTypeBeneficiary(typeBeneficiary).name
    },
    nameRegionBeneficiary (region) {
      return this.getRegion(region).name
    },
    nameProvinceBeneficiary (province) {
      return this.getProvince(provinces).name
    },
    nameDistrictBeneficiary (district) {
      return this.getDistrict(district).name
    }
  },
  methods: {
    initConsole () {
      console.log(this.entities)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
