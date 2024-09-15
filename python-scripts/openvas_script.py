from ssh_helper import execute_command_on_kali

def run_openvas(ip):
    command = f"openvas -s {ip}"  # Replace with the OpenVAS command of your choice
    output, error = execute_command_on_kali(command)
    
    if output:
        print(f"OpenVAS Output:\n{output}")
    if error:
        print(f"OpenVAS Error:\n{error}")
