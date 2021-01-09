import React from  'react';
import { Table, Space, Typography } from 'antd';


//custom imports
import './Table.css';
import {dummyTableStructure, dummyData } from './utility.js'

const { Text, Link } = Typography;
const { Column } = Table;

class TableComponent extends React.Component{
    
    render(){
        console.log(this.props);
        let pageSize = this.props.pageSize || 5;
        let tableStructure = this.props.tableStructure || dummyTableStructure;
        let data = this.props.data || dummyData;
        
        return (
            <Table dataSource={data} pagination={{ position: ['topRight', "none"], pageSize: pageSize }}>
                {
                    tableStructure.map(column=>{
                        if(column.type === 'DETAIL'){
                            return (
                                <Column 
                                    title= {column.title}
                                    dataIndex= {column.dataIndex}
                                    key= {column.key}
                                    align= {column.align}
                                    render = { data=>{
                                        return (
                                            <>
                                            {
                                                data.map( (val,index) => {
                                                    if(index === 0){
                                                        return (
                                                            <div>
                                                                <Text type = { column.heroColor || "default"} strong = {column.heroStrong}> {val} </Text>
                                                            </div>
                                                        )
                                                    }    
                                                    return (
                                                        <div>
                                                            <Text type = { column.textColor || "default"}> {val} </Text>
                                                        </div>
                                                    )
                                                    
                                                })
                                            }
                                            </>
                                        )
                                        
                                    }}
                                />
                            )
                        }
                        
                        if(column.type === 'TEXT'){
                            return (
                                <Column 
                                    title= {column.title}
                                    dataIndex= {column.dataIndex}
                                    key= {column.key}
                                    align= {column.align}
                                    render = { data=>{
                                        return (
                                            <Text type = { column.heroColor || "default"} strong = {column.heroStrong}> {data} </Text>
                                        )                                            
                                    }}
                                    sorter = {column.sorter}
                                    defaultSortOrder = {column.defaultSortOrder}
                                />
                            )
                        }
                        if(column.type === 'LINK'){
                            return(
                                <Column 
                                    title= {column.title}
                                    dataIndex= {column.dataIndex}
                                    key= {column.key}
                                    align= {column.align}
                                    render = {data=>{
                                        return(
                                            <Space size="middle">
                                                {
                                                    data.map(link=>(
                                                        <Link href={link.action} > {link.title}</Link>
                                                    ))
                                                }
                                            </Space>
                                        )
                                    }} 
                                />
                            )
                        }
                        return false;
                    })
                }
            </Table>
        )
    }
}

export default TableComponent;