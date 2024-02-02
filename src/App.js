import './App.css';
import { useState } from 'react';

function App() {

  let [roll_No, setroll_no] = useState("");
  let [name, setname] = useState("");
  let [sub1, setsub1] = useState("");
  let [sub2, setsub2] = useState("");
  let [sub3, setsub3] = useState("");
  let [sub4, setsub4] = useState("");
  let [sub5, setsub5] = useState("");
  let [res, setres] = useState([]);
  let [reset, setreset] = useState([]);

  const btn = () => {
    
    var total, per = 0, min = 0, max = 0;

    total = parseFloat(sub1) + parseFloat(sub2) + parseFloat(sub3) + parseFloat(sub4) + parseFloat(sub5);

    if (sub1 >= 35 && sub2 >= 35 && sub3 >= 35 && sub4 >= 35 && sub5 >= 35) {
      per = ((total / 500) * 100).toFixed(2);
    } else {
      per = 0;
    }

    if (sub1 < sub2 && sub1 < sub3 && sub1 < sub4 && sub1 < sub5) {
      min = sub1;
    } else if (sub2 < sub3 && sub2 < sub4 && sub2 < sub5) {
      min = sub2;
    } else if (sub3 < sub4 && sub3 < sub5) {
      min = sub3;
    } else if (sub4 < sub5) {
      min = sub4;
    } else {
      min = sub5;
    }

    if (sub1 > sub2 && sub1 > sub3 && sub1 > sub4 && sub1 > sub5) {
      max = sub1;
    } else if (sub2 > sub3 && sub2 > sub4 && sub2 > sub5) {
      max = sub2;
    } else if (sub3 > sub4 && sub3 > sub5) {
      max = sub3;
    } else if (sub4 > sub5) {
      max = sub4;
    } else {
      max = sub5;
    }

    var cnt = 0, result = '';
    if (sub1 < 35) {
      cnt++;
    }
    if (sub2 < 35) {
      cnt++;
    }
    if (sub3 < 35) {
      cnt++;
    }
    if (sub4 < 35) {
      cnt++;
    }
    if (sub5 < 35) {
      cnt++;
    }
    if (cnt == 0) {
      result = "PASS"
    } else if (cnt == 1 || cnt == 2) {
      result = "ATKT";
    } else {
      result = "FAIL";
    }

    const obj = {
      rollNo: roll_No,
      name: name,
      sub1: sub1,
      sub2: sub2,
      sub3: sub3,
      sub4: sub4,
      sub5: sub5,
      total: total,
      per: per,
      min: min,
      max: max,
      result: result
    }
    setres([...res, obj]);
    setreset([...reset, obj]);
    setroll_no("");
    setname("");
    setsub1("");
    setsub2("");
    setsub3("");
    setsub4("");
    setsub5("");
  }

  const perbtn = (e) => {
    const demo = reset.filter((item, index) => {
      return item.per >= parseFloat(e.target.value);
    })
    setres(demo);
  }

  const selectres = (e) => {
    const demo1 = reset.filter((item, index) => {
      return item.result == (e.target.value);
    })
    setres(demo1);
  }

  const btnall = () => {
    setres([...reset]);
  }

  const btnsort = () => {
    const demo2 =([...reset]);
    demo2.sort((a,b)=>b.per - a.per);
    setres(demo2);
  }

  return (
    <div>
      <p className='title'>STUDENT Result...!</p>
      <div className="App">

        R_NO.<input type='text' value={roll_No} onChange={(e) => setroll_no(e.target.value)}></input><br></br>
        NAME<input type='text' value={name} onChange={(e) => setname(e.target.value)} ></input><br></br>
        SUB:1<input type='text' value={sub1} onChange={(e) => setsub1(e.target.value)}></input><br></br>
        SUB:2<input type='text' value={sub2} onChange={(e) => setsub2(e.target.value)}></input><br></br>
        SUB:3<input type='text' value={sub3} onChange={(e) => setsub3(e.target.value)}></input><br></br>
        SUB:4<input type='text' value={sub4} onChange={(e) => setsub4(e.target.value)}></input><br></br>
        SUB:5<input type='text' value={sub5} onChange={(e) => setsub5(e.target.value)}></input><br></br>
        <input type='button' value={"Click"} onClick={btn}></input><br></br>

        <select className='allsel' onChange={perbtn}>
          <option >Per</option>
          <option value={90}>90+</option>
          <option value={80}>80+</option>
          <option value={70}>70+</option>
          <option value={60}>60+</option>
          <option value={50}>50+</option>
        </select>

        <select onChange={selectres}>
          <option>RESULT</option>
          <option value={"PASS"}>pass</option>
          <option value={"FAIL"}>fail</option>
          <option value={"ATKT"}>ATKT</option>
        </select>

        <input type='button' value={"All"} onClick={btnall} ></input>
        <input type='button' value={"Sort"} onClick={btnsort} ></input>

        <table border={1}>
            <tr>
              <th>RNO</th>
              <th>NAME</th>
              <th>SUB1</th>
              <th>SUB2</th>
              <th>SUB3</th>
              <th>SUB4</th>
              <th>SUB5</th>
              <th>Total</th>
              <th>Percentage</th>
              <th>Min</th>
              <th>Max</th>
              <th>Result</th>
            </tr>
          <tbody>
            {
              res.map((item, index) => (
                <tr key={index} style={{ backgroundColor: item.result === 'PASS' ? 'green' : item.result === 'ATKT' ? 'blue' : 'red' }}>
                  <td>{item.rollNo}</td>
                  <td>{item.name}</td>
                  <td>{item.sub1}</td>
                  <td>{item.sub2}</td>
                  <td>{item.sub3}</td>
                  <td>{item.sub4}</td>
                  <td>{item.sub5}</td>
                  <td>{item.total}</td>
                  <td>{item.per}</td>
                  <td>{item.min}</td>
                  <td>{item.max}</td>
                  <td>{item.result}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );

  // function color(result) {
  //   switch (result) {
  //     case "PASS":
  //       return "green";
  //     case "ATKT":
  //       return "blue";
  //     case "FAIL":
  //       return "red";
  //     default:
  //       return "";
  //   }
  // }
}

export default App;