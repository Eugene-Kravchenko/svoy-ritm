import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import {defineConfig} from 'vite';
const base=process.env.VITE_BASE_PATH?`${process.env.VITE_BASE_PATH.replace(/\/$/,'')}/`:'/';
export default defineConfig({base,css:{postcss:{plugins:[tailwindcss()]}},server:{host:'127.0.0.1',port:43828,strictPort:true,proxy:{'/api':{target:'http://127.0.0.1:43827',changeOrigin:true}}},plugins:[vinext()]});
