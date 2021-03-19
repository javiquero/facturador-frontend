<template>
    <div class="text-center">
        <h1>Dashboard</h1>


        <v-row class="mt-10" >
            <v-col cols="12" sm="8">
                <v-card height="340" color="white"  elevation="2" style="display:flex;"  >
                        <v-sparkline
                            :value="value"
                            :gradient="gradient"
                            :smooth="radius || false"
                            :padding="padding"
                            :line-width="width"
                            :stroke-linecap="lineCap"
                            :gradient-direction="gradientDirection"
                            :fill="fill"
                            :type="type"
                            :auto-line-width="autoLineWidth"
                            auto-draw
                        ></v-sparkline>
                </v-card>               
            </v-col>       
            <v-col cols="12" sm="4">
                        <v-carousel cycle height="350 " hide-delimiter-background show-arrows-on-hover  style="border-radius: 4px; " >
                            <v-carousel-item v-for="(slide, i) in slides" :key="i" >
                                <v-sheet :color="colors[i]" height="100%" style="border-radius: 4px; box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;">
                                    <v-row class="fill-height" align="center" justify="center" >
                                        <div class="display-3">
                                            {{ slide }} Slide
                                        </div>
                                    </v-row>
                                </v-sheet>
                            </v-carousel-item>
                    </v-carousel>
            </v-col>           
        </v-row>

        <v-row class="" >
            <v-col cols="12" sm="6">
                <v-card color="white" class="mb-8" elevation="2"   >
                     <v-card-title>Productos</v-card-title>
                     <v-card-text>
                        <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1" ></v-data-table>
                    </v-card-text>
                </v-card>
                <v-card color="white" elevation="2"   >
                   <v-card-title>Pedidos</v-card-title>
                     <v-card-text>
                        <v-data-table :headers="headers" :items="desserts" :items-per-page="3" class="elevation-1" ></v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card  color="white" class="mb-8" elevation="2"   >
                    <v-card-title>Clientes</v-card-title>
                     <v-card-text>
                        <v-data-table :headers="headers" :items="desserts" :items-per-page="3" class="elevation-1" ></v-data-table>
                    </v-card-text>
                </v-card>
                <v-card  color="white" elevation="2"   >
                     <v-card-title>Facturas</v-card-title>
                     <v-card-text>
                        <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1" ></v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    
    </div>
</template>

<script>
const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]

export default {
    
    data(){return{
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
        width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
         headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
    }}
}
</script>

<style>

</style>