from ssh_helper import execute_command_on_kali

def run_dirb(ip):
    command = f"dirb http://{ip}"  # Replace with the Dirb command of your choice
    output, error = execute_command_on_kali(command)
    
    if output:
        print(f"Dirb Output:\n{output}")
    if error:
        print(f"Dirb Error:\n{error}")
