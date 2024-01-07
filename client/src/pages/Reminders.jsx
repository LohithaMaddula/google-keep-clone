
function Reminders() {

  return (
    <div>
      <h1>Reminders</h1>
      <button onClick={() => Notification.requestPermission()}>noti permission check</button>
    </div>
  )
}

export default Reminders
