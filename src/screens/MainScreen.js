/* This example requires Tailwind CSS v2.0+ */
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'
import Cards from '../components/Cards'
import { useState } from 'react';
import Popup from '../components/Popup';

const features = [
  {
    name: 'TO-DO',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: GlobeAltIcon,
    color: "red"
  },
  {
    name: 'DO TODAY',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: ScaleIcon,
    color: "orange"
  },
  {
    name: 'IN PROGRESS',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: LightningBoltIcon,
    color: "blue"
  },
  {
    name: 'COMPLETED',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: AnnotationIcon,
    color: "green"
  },
]

const defaultTasks = [
  {
    name: "Task1",
    status: 'TO-DO',
    description: 'An Idea',
  },
  {
    name: "Task2",
    status: 'DO TODAY',
    description: 'A small task to get closet to result',
  },
  {
    name: "Task3",
    status: 'IN PROGRESS',
    description: 'Status in the middle',
  },
  {
    name: "Task4",
    status: 'COMPLETED',
    description: 'THE RESULT',
  }
];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MainScreen() {
  const [dragId, setDragId] = useState("");
  const [tasks, setTasks] = useState(defaultTasks);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    status: 'TO-DO',
    description: '',
  })

  const handleAddNewTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, newTask])
    setNewTask({
      name: '',
      status: 'TO-DO',
      description: '',
    })
  }
  const handleNewEventData = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  }

  const handleCallBackDragId = (newDragId) => {
    setDragId(newDragId);
  }

  const handleDrop = (e) => {


    const newTasks = tasks.map(task => {
      if (task.name === dragId) { return { ...task, status: e.target.id } }
      else return task
    })
    setTasks(newTasks);
    const card = document.getElementById(dragId);
    console.log('Drop element: ', e.target.id);
    // e.target.appendChild(card);

  }

  const dragOver = e => {
    // console.log('Drag over: ', e);
    e.preventDefault();
  }


  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h1 className="text-base my-4  text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">CAN-BAN BOARD</h1>
          <div className="rounded-md shadow text-center">
            <a
              href="#"
              onClick={() => setShowForm(!showForm)}
              className="w-full flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Add Task
            </a>
          </div>
          {(showForm) ? (<div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleAddNewTask}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={newTask.name}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => handleNewEventData(e)}
                      />
                    </div>



                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        onChange={(e) => handleNewEventData(e)}
                        value={newTask.status}
                        id="status"
                        name="status"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>TO-DO</option>
                        <option>DO TODAY</option>
                        <option>IN PROGRESS</option>
                        <option>COMPLETED</option>
                      </select>
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        onChange={(e) => handleNewEventData(e)}
                        value={newTask.description}
                        id="description"
                        name="description"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Task description"
                        defaultValue={''}
                      />
                    </div>


                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>) : (<></>)}

        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-4 sm:grid-cols-2 md:gap-x-4 md:gap-y-10">
            {features.map((feature) => (
              <div id={feature.name} onDrop={handleDrop} onDragOver={dragOver} key={feature.name} className={'relative h-screen rounded-md border-grey-200 ' + `bg-${feature.color}-100 `}>
                <dt>

                  <p className={'text-lg leading-6 font-medium text-gray-900 rounded-t-md md:text-center ' + `bg-${feature.color}-400`}>{feature.name}</p>
                </dt>
                <dd className={"mt-2 m-4 text-base " + `text-${feature.color}-800`}>
                  {tasks.map((task, index) => (
                    (feature.name === task.status) ? (
                      <Cards id={task.name} cardClassName={task.name} draggable={true} color={feature.color} name={task.name} callBack={handleCallBackDragId} />
                    ) : <></>)
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
