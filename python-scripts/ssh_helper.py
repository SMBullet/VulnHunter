import paramiko

# SSH connection details
hostname = '192.168.100.75'  # Replace with the IP address of your Kali Linux VM
port = 22
username = 'mehdi'  # Replace with your Kali Linux username
password = '2002'  # Replace with your Kali Linux password

def execute_command_on_kali(command):
    try:
        # Create an SSH client
        client = paramiko.SSHClient()

        # Automatically add the server's host key (if missing)
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        # Connect to the remote machine
        client.connect(hostname, port, username, password)

        # Execute the command on the remote machine
        stdin, stdout, stderr = client.exec_command(command)
        
        # Get command output and error
        output = stdout.read().decode('utf-8')
        error = stderr.read().decode('utf-8')

        return output, error

    except Exception as e:
        return f"An error occurred: {e}", ""

    finally:
        # Close the SSH connection
        client.close()
