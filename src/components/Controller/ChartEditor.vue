<template>
    <Dialog v-model:visible="visible" modal header="Chart Editor" :style="{ width: '50vw' }">
        <div class="flex flex-column">
            <InputNumber v-model="rotation" @update:modelValue="updateChart" />
            <DataTable :value="localData" editMode="cell" @cell-edit-complete="updateChart">
                <Column field="sequence" header="Seq" :editor="options => h(InputNumber, { ...options, min: 1 })" />
                <Column field="backgroundColor" header="Color">
                    <template #body="slotProps">
                        <div
                            :style="{ backgroundColor: slotProps.data.backgroundColor, width: '20px', height: '20px' }">
                        </div>
                    </template>
                    <template #editor="slotProps">
                        <input type="color" v-model="slotProps.data.backgroundColor" @change="updateChart" />
                    </template>
                </Column>
                <Column field="label" header="Name" :editor="options => h(InputText, options)" />
                <Column field="data" header="Data" :editor="options => h(InputNumber, options)" />
                <Column>
                    <template #body="slotProps">
                        <Button icon="pi pi-trash" @click="removeColor(slotProps.index)"></Button>>
                        <Button icon="pi pi-arrow-up" @click="moveUp(slotProps.index)"
                            :disabled="slotProps.index === 0"></Button>
                        <Button icon="pi pi-arrow-down" @click="moveDown(slotProps.index)"
                            :disabled="slotProps.index === localData.length - 1"></Button>
                    </template>
                </Column>
            </DataTable>
            <Button label="Add Color" @click="addColor" />
        </div>
    </Dialog>
</template>

<script>
import { h } from 'vue'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'

export default {
    components: { Dialog, DataTable, Column, Button, InputNumber, InputText },
    props: ['chartData'],
    data() {
        return {
            visible: true,
            localData: [],
            rotation: 0
        }
    },
    watch: {
        chartData: {
            immediate: true,
            handler(newData) {
                this.localData = newData.datasets[0].data.map((value, i) => ({
                    sequence: i + 1,
                    backgroundColor: newData.datasets[0].backgroundColor[i],
                    label: newData.labels[i],
                    data: value
                }))
            }
        }
    },
    methods: {
        updateChart() {
            const updatedData = {
                labels: this.localData.map(item => item.label),
                datasets: [{
                    data: this.localData.map(item => item.data),
                    backgroundColor: this.localData.map(item => item.backgroundColor),
                    borderWidth: 2,
                    spacing: 0
                }]
            }
            this.$emit('update-chart', updatedData)
        },
        addColor() {
            this.localData.push({ sequence: this.localData.length + 1, backgroundColor: '#000000', label: 'New', data: 0 })
            this.updateChart()
        },
        removeColor(index) {
            this.localData.splice(index, 1)
            this.localData.forEach((item, i) => item.sequence = i + 1)
            this.updateChart()
        },
        moveUp(index) {
            const temp = this.localData[index]
            this.localData[index] = this.localData[index - 1]
            this.localData[index - 1] = temp
            this.localData.forEach((item, i) => item.sequence = i + 1)
            this.updateChart()
        },
        moveDown(index) {
            const temp = this.localData[index]
            this.localData[index] = this.localData[index + 1]
            this.localData[index + 1] = temp
            this.localData.forEach((item, i) => item.sequence = i + 1)
            this.updateChart()
        }
    }
}
</script>

<style scoped>
:deep(.p-datatable) {
    max-height: 400px;
    overflow-y: auto;
}
</style>