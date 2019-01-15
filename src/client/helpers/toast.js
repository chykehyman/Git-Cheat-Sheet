import toastr from 'toastr';

export default (status, message) => {
  toastr.clear();
  if (status === 'error') {
    return toastr.error(message);
  }
  return toastr.success(message);
};
