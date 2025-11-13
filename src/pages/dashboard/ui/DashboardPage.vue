<template>
  <section class="page">
    <AssetTable />
  </section>
</template>

<script setup lang="ts">
import AssetTable from "@/widgets/asset-table/ui/AssetTable.vue"
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
