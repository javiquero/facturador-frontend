<template>
    <v-navigation-drawer v-model="drawer" app  color="blue-grey lighten-1" expand-on-hover permanent mini-variant>
			<v-list-item class="px-2">
				<v-list-item-avatar>
					<i class="fad fa-dot-circle" style="color:white; font-size:40px"></i>
				</v-list-item-avatar>
				<v-list-item-title class="blue-grey--text text--lighten-5">Facturador</v-list-item-title>
				<v-btn icon @click.stop="mini = !mini" class="blue-grey--text text--lighten-5">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
			</v-list-item>

			<v-divider></v-divider>

			<v-list dense>
				<v-list-item v-for="item in items" :key="item.title" link :to="item.path">
					<v-list-item-icon style="font-size:24px">
						<i class="blue-grey--text text--lighten-5" style="text-align:center;width:30px;" :class="item.icon"></i>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title class="blue-grey--text text--lighten-5" style="font-size:20px">{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
</template>

<script>
export default {
    name: "sidebar",
    data: () => ({
			items: [{
					title: 'Inicio',
					icon: "fad fa-home",
					path:'/private/main'
				},
				{
					title: 'Pedidos',
					icon: 'fad fa-file-spreadsheet',
					path:'/private/orders'
				},
				{
					title: 'Clientes',
					icon: 'fad fa-users',
					path:'/private/customers'
				},
				{
					title: 'Facturas',
					icon: 'fad fa-file-invoice',
					path:'/private/invoices'
				},
				{
					title: 'Productos',
					icon: 'fad fa-box-full',
					path:'/private/products'
				},
			],
			drawer: true,
		}),
    
}
</script>

<style lang="scss">

</style>