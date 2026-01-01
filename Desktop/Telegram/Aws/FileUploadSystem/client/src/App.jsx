import React from 'react'
import {Button, message, Upload, Card, Typography} from 'antd'
import {useState} from 'react'
import {UploadOutlined} from '@ant-design/icons';

const {Title, Text}= Typography;
const App = () => { 
  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState('');
  const [loading, setLoading]= useState(false);

  const uploadFile = async() => {
    try{
      if(!file){
        message.warning("Please upload a file")
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      // const res= await fetch("http://13.219.248.166:3000/upload", {
      const res= await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData
      });

      const data= await res.json();
      setMsg(data.message)
      message.success("File uploaded successfully")
      setLoading(false);
    }
    catch(err){
      message.error("File upload failed")
    }
  }

  return (
    <div>
      <Title>File Upload System</Title>
      <Upload
        beforeUpload={(file)=>{
          setFile(file);
          return false;
        }}
        maxCount={1}
      >
        <Button icon={<UploadOutlined/>}>Select File</Button>
      </Upload>
      <br /> <br />
      <Button 
        type="primary" 
        onClick={uploadFile}
        loading={loading}
        style={{marginTop: 16}}
      >
        Submit
      </Button>
      {file && (
        <Text style={{display: "block", marginTop: 12}}>
          Selected: {file.name}
        </Text>
      )}
    </div>
  )

}

export default App
