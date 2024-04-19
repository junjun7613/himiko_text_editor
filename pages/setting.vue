<template>
    <v-app>
      <v-container>
        <div class="main-container">
          <p>Editorに設定ファイルとしてアップロードするJSONをインターフェイス上で編集することができます。</p>
        </div>
        <v-card class="input-card">
            <div>
                <p>ファクトイドのタイプを設定</p>
                <v-btn class="add-button" @click="addFactoidTypeRow">+</v-btn>
                <v-col class="input-row" v-for="(row,index) in factoidTypeRows" :key="index">
                    <v-row>
                    <v-col cols="12" md="3">
                        <v-text-field
                        density="compact"
                        v-model="row.factoidTypeLabel"
                        label="Labelを入力"
                        outlined/>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field
                        density="compact"
                        v-model="row.factoidTypeId"
                        label="IDを入力"
                        outlined/>
                    </v-col>
                    <v-col cols="12" md="1">
                        <v-btn @click="removeFactoidTypeRow(index)">削除</v-btn>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-btn @click="addFactoidSubTypeRow(index)">サブタイプを入力</v-btn>
                    </v-col>
                </v-row>
                    <v-row v-for="(child, childIndex) in row.children" :key="childIndex" class="pl-15">
                        <v-col cols="12" md="3">
                            <v-text-field
                            density="compact"
                            v-model="child.factoidTypeLabel"
                            label="Labelを入力"
                            outlined/>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field
                            density="compact"
                            v-model="child.factoidTypeId"
                            label="IDを入力"
                            outlined/>
                        </v-col>
                        <v-col cols="12" md="1">
                            <v-btn @click="removeFactoidSubTypeRow(index, childIndex)">削除</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <!--{{factoidTypeRows}}-->
            </div>
        </v-card>
      <v-btn class="dl-button" @click="downloadJSON">JSONダウンロード</v-btn>
      </v-container>
    </v-app>
</template>

<script setup>
import { ref, watch } from "vue";
import Treeselect from "vue3-treeselect";
import "vue3-treeselect/dist/vue3-treeselect.css";

const factoidTypeLabel = ref("");
const factoidTypeId = ref("");
const factoidTypeRows = ref([]);

function addFactoidTypeRow () {
    factoidTypeRows.value.push({factoidTypeLabel: factoidTypeLabel.value, factoidTypeId: factoidTypeId.value});
};

function removeFactoidTypeRow (index) {
    factoidTypeRows.value.splice(index, 1);
};

function removeFactoidSubTypeRow (index, childIndex) {
    factoidTypeRows.value[index].children.splice(childIndex, 1);
};

function downloadJSON() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(factoidTypeRows.value));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "factoidTypeRows.json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }

function addFactoidSubTypeRow(index) {
      if (!factoidTypeRows.value[index].children) {
        factoidTypeRows.value[index].children = [];
      }
      factoidTypeRows.value[index].children.push({ factoidTypeLabel: factoidTypeLabel.value, factoidTypeId: factoidTypeId.value });
    }

</script>

<style>
.main-container {
    /*max-width: 1200px;*/
    color: #666;
    margin: 20px auto;
    padding: 20px;
    font-weight: bold;
}
.input-card {
    /*width: 800px;*/
    margin-left: 20px;
    margin-right: 60px;
    padding: 20px;
    max-height: 300px;
    overflow-y: auto;
}
.add-button {
    margin-top: 10px;
    margin-bottom: 10px;
}
.dl-button {
    margin-top: 40px;
    margin-left: 20px;
}
.input-row {
    margin-top: 10px;
}
</style>