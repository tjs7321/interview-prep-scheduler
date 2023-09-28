

export default function PrepSessionUserListContainer(props) {
    const {users, handleAddUser} = props

    // RENDERED PIECES
    const renderedUserList = users.map(result => {
        return (
            <li key={result['id']}>{result['username']}</li>
        )
    })

    return (
        <div>
            <button onClick={handleAddUser}>Add friend...</button>
            <ul>
                {renderedUserList}
            </ul>
        </div>
    )
}