import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableHighlight,
    ListView
}from 'react-native'

'use district';

import Util from '../../view/utils'

export default class extends Component{

    static propTypes = {

    };
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2});
        this.state = {
            dataSource:dataSource
        };
        this.renderRow = this.renderRow.bind(this);
    }



    renderRow (renderData){
        var tags = [];
        for(var i in renderData.tags){
            var tag = (
                <Text key={renderData.tags[i].tagName} style={styles.text_box}>{renderData.tags[i].tagName}</Text>
            );
            if(i>=3){
                break;
            }
            tags.push(tag);
        }
        return (
            <TouchableHighlight onPress={()=>this.props.goSecondHouseDetail()} underlayColor="#eee">
                <View style={[styles.houseContainer]}>
                    <View style={[styles.imageContainer]}>
                        <Image source={{uri:Util.tfsServer+renderData.realImg}} style={[styles.houseImage]}/>
                    </View>
                    <View style={[styles.contentContainer]}>
                        <View style={[styles.flex_row]}>
                            <View style={{flex:0.8,flexWrap:'nowrap',alignItems:'flex-start'}}>
                                <Text numberOfLines={1}>{renderData.title}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_row]}>
                            <View style={[styles.flex_row,{flex:1.5}]}>
                                <Text numberOfLines={1} style={[styles.font_12]}>{renderData.room}室{renderData.hall}厅 {renderData.area}㎡</Text>
                            </View>
                            <View style={[styles.flex_row,{flex:1}]}>
                                <Text style={[styles.font_red]}>{renderData.amounts}万</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_row]}>
                            <View style={[styles.flex_row]}><Text numberOfLines={1} style={[styles.font_11]}>{renderData.position}</Text></View>
                            <View style={[styles.flex_row]}><Text style={[styles.font_11]}>待定</Text></View>
                        </View>
                        <View style={[styles.flex_row]}>
                            {tags}
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    render(){
        return (
            <ListView
                dataSource={this.state.dataSource.cloneWithRows(this.props.secondHouseData)}
                renderRow={this.renderRow}
                onEndReached={()=>this.props.getSecondHouses()}
                onEndReachedThreshold={1}
                enableEmptySections = {true}
            >
            </ListView>
        );
    }

}

const styles = StyleSheet.create({

    houseContainer: {
        flex: 1,
        height: (Util.size.height - 85) / 4,
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: Util.pixel,
        borderBottomColor: '#eee',
        flexDirection: 'row'
    },
    houseImage: {
        height: (Util.size.height - 120) / 4-10,
        width: Util.size.width / 2 - 30,
        resizeMode: 'stretch'
    },
    imageContainer: {
        flex: 1,
        marginRight:3,
        marginBottom:10
    },
    contentContainer: {
        flex: 1.2,
        flexDirection: 'column',
        marginBottom:10
    },
    flex_row: {
        flex: 1,
        flexWrap:'nowrap',
        flexDirection:'row',
        alignItems:'center'
    },
    flex_column: {
        flex: 1,
        flexDirection: 'column'
    },
    text_box:{
        height:18,
        padding:1,
        marginLeft:3,
        fontSize:11,
        borderWidth:Util.pixel,
        borderColor:'black',
        textAlign:'center'
    },
    font_11:{
        fontSize:11
    },
    font_red:{
        color:"red"
    },
    font_12:{
        fontSize:12
    }

});