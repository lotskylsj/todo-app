<script setup lang="ts">
import { ref, reactive } from 'vue'

// 产品类型定义
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// 产品数组
const products = reactive<Product[]>([
  {
    id: 1,
    name: 'Alice',
    price: 100,
    quantity: 5
  },
  {
    id: 2,
    name: 'Bob',
    price: 200,
    quantity: 3
  },
  {
    id: 3,
    name: 'Charlie',
    price: 150,
    quantity: 8
  },
  {
    id: 4,
    name: 'David',
    price: 300,
    quantity: 2
  }
]);

// 查找的产品ID
const searchId = ref<number>(1);
// 查找结果
const foundProduct = ref<Product | null>(null);

// 根据ID查找产品的方法
const findProductById = (id: number, name: string): Product | undefined => {
  const product = products.find(item => item.id === id || item.name === name);
  foundProduct.value = product || null;
  return product;
};

// 初始查找
findProductById(searchId.value, '');
</script>
<template>
    <div class="p-4">
        <h2 class="text-xl font-semibold mb-4">产品查找</h2>
        
        <!-- 查找表单 -->
        <div class="flex gap-2 mb-4">
            <input 
                v-model.number="searchId" 
                type="number" 
                placeholder="输入产品ID" 
                class="border border-gray-300 rounded px-3 py-2 w-32"
            />
            <button 
                @click="findProductById(searchId.valueOf(), '')" 
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
                查找
            </button>
        </div>
        
        <!-- 查找结果 -->
        <div class="mt-4">
            <h3 class="font-medium mb-2">查找结果:</h3>
            <div v-if="foundProduct" class="border border-gray-200 rounded p-4">
                <p>Id: {{ foundProduct.id }}</p>
                <p>Name: {{ foundProduct.name }}</p>
                <p>Price: {{ foundProduct.price }}</p>
                <p>Quantity: {{ foundProduct.quantity }}</p>
            </div>
            <div v-else class="text-red-500">
                未找到对应ID的产品
            </div>
        </div>
        
        <!-- 产品列表 -->
        <div class="mt-8">
            <h3 class="font-medium mb-2">产品列表:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                    v-for="product in products" 
                    :key="product.id"
                    class="border border-gray-200 rounded p-3"
                >
                    <p>Id: {{ product.id }}</p>
                    <p>Name: {{ product.name }}</p>
                    <p>Price: {{ product.price }}</p>
                    <p>Quantity: {{ product.quantity }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 可以添加额外的本地样式 */
</style>