·<template>
    <fox-page>
        <fox-content>
            <fox-row style="display:flex; border: 1px solid rgba(209, 209, 209, 0.6);">
                <fox-col style="flex: 1 1 50%">
                    <fox-image src="../../../static/img/cardreader.gif" :fit="fill"></fox-image>
                </fox-col>
                <fox-col style="flex: 1 1 50%">
                    <fox-item align="center" style="margin-top:40%">
                        <h2>请刷磁</h2>
                    </fox-item>
                    <fox-item align="right" style="margin: 0;right: 0;bottom: 0;position: absolute;">
                        <fox-button type="primary" size="medium" icon="el-icon-star-off" @click="cancel">取消</fox-button>
                    </fox-item>
                </fox-col>
            </fox-row>
        </fox-content>
    </fox-page>
</template>

<script>
import QM0001 from '../../utils/custom/read-card-helper/QM0001.js'

export default {
    name: 'ReadCard',
    data: function () {
        return {

        }
    },
    methods: {
        cancel() {

        },
    },

    fox_flow() {
        return {
            mounted(session, context) {
                QM0001.define(this)
                context.resolve()
            },
        }
    },
}
</script>
<style scoped>
</style>