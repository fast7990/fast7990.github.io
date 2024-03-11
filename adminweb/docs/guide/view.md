<!--
 * @Author: 17331300832 17331300832@163.com
 * @Date: 2023-11-23 15:21:45
 * @LastEditors: 17331300832 17331300832@163.com
 * @LastEditTime: 2023-11-24 14:23:02
 * @FilePath: \vue-bag-admin-master\docs\guide\view.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 视图更改

## Logo更改

```javascript
import {createApp} from "vue"

createApp(App).use(install, {
    website: {
        logo: "图片",
        title: "admin"
    },
}).use(router).mount("#app")

```

## 头部右侧更改

```javascript
import {createApp, shallowRef} from "vue"
import headerUserSet from "@/app/admin/components/headerUserSet.vue" // 组件地址
createApp(App).use(install, {
    components: {
        headerUserSet: shallowRef(headerUserSet)
    }
}).use(router).mount("#app")
```

列子：headerUserSet.vue
>通过`useAttrs`实现数据透传

```vue

<template>
	<div class="user-set">
		<template v-if="!app.browser.sm">
			<n-el tag="div" class="set-item">
				<n-switch @update:value="compData.handleDarkTheme" v-model:value="darkTheme" size="medium">
					<template #checked-icon>
						<n-icon :size="14">
							<MoonOutline/>
						</n-icon>
					</template>
					<template #unchecked-icon>
						<n-icon :size="14">
							<SunnyOutline/>
						</n-icon>
					</template>
				</n-switch>
			</n-el>
		</template>
	</div>
</template>
<script lang="ts">
import {defineComponent, useAttrs} from "vue"

export default defineComponent({
	setup() {
		const attrs = useAttrs() // 可直接调用
		return {
			app: attrs.app,
			compData: attrs.compData,
			darkTheme: attrs.darkTheme,
		}
	}
})
</script>

<style lang="less" scoped>
.user-set {
	display: flex;
	height: 50px;
	flex-shrink: 0;
	margin-left: 50px;
	align-items: center;

	.set-item {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 12px;
		padding-right: 12px;
		cursor: pointer;
		flex-shrink: 0;

		.n-icon {
			outline: none;

			svg {
				outline: none;
			}
		}

		&.hover-color {
			&:last-of-type {
				padding-right: 2px;
			}

			&:hover {
				color: var(--primary-color);
			}
		}
	}
}
</style>
```
